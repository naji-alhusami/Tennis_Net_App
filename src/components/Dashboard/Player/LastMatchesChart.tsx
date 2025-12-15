"use client"

import { useState, useMemo } from "react"
import { Label, Pie, PieChart, Sector } from "recharts"
import { PieSectorDataItem } from "recharts/types/polar/Pie"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartStyle,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

// Type for a single month item in the chart
type MonthPoint = {
    year: number            // e.g. 2025
    monthNumber: number     // 1–12
    label: string           // e.g. "January 2025"
    matches: number       // value for this month (from DB later)
}

// Static month names so server + client render the same text
const MONTH_NAMES_EN = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
]

function buildLastFiveMonths(): MonthPoint[] {
    const now = new Date()
    const result: MonthPoint[] = []

    for (let i = 4; i >= 0; i--) {
        const d = new Date(now.getFullYear(), now.getMonth() - i, 1)

        const year = d.getFullYear()
        const monthNumber = d.getMonth() + 1
        const label = `${MONTH_NAMES_EN[monthNumber - 1]} ${year}`

        // TODO: MongoDB
        // const matches = matchesByMonth[`${year}-${monthNumber}`] ?? 0

        const matches = (5 - i) * 12

        result.push({ year, monthNumber, label, matches })
    }

    return result
}


// Config for your custom <ChartContainer /> helper (series labels etc.)
const chartConfig = {
    matches: { label: "Matches" },
} satisfies ChartConfig

export default function LastMatchesChart() {
    // ID used to bind ChartStyle / ChartContainer
    const id = "pie-interactive"

    // 1) Build the raw last-5-months data once (on mount)
    const lastFiveData = useMemo(() => buildLastFiveMonths(), [])

    // 3) Add fill color for each slice using CSS vars (var(--chart-1..5))
    const coloredData = useMemo(
        () =>
            lastFiveData.map((item, index) => ({
                ...item,
                // use chart-1, chart-2, ... chart-5 in a loop
                fill: `var(--chart-${(index % 5) + 1})`,
            })),
        [lastFiveData]
    )

    // 4) Active key in the <Select>, format "year-monthNumber" e.g. "2025-12"
    const [activeKey, setActiveKey] = useState(
        `${lastFiveData[0].year}-${lastFiveData[0].monthNumber}`
    )

    // 5) Find which index is currently active (for highlighting in <Pie>)
    const activeIndex = useMemo(
        () =>
            coloredData.findIndex(
                (item) => `${item.year}-${item.monthNumber}` === activeKey
            ),
        [activeKey, coloredData]
    )

    // 6) Get the active item (fallback to first if something is weird)
    const activeItem = coloredData[activeIndex] ?? coloredData[0]

    // 2) Early return if no data at all (safety, even though we always return 5)
    if (lastFiveData.length === 0) {
        return (
            <Card data-chart={id} className="flex flex-col">
                <CardHeader>
                    <CardTitle>Matches Last 5 Months</CardTitle>
                    <CardDescription>No data available for the last 5 months.</CardDescription>
                </CardHeader>
            </Card>
        )
    }

    // 7) Render the actual chart
    return (
        <Card data-chart={id} className="w-full h-full flex flex-col">
            {/* Injects CSS variables etc based on chartConfig */}
            <ChartStyle id={id} config={chartConfig} />

            {/* Header with title + description + month selector */}
            <CardHeader className="flex-row items-start space-y-0 pb-0">
                <div className="grid gap-1">
                    <CardTitle>Matches Last 5 Months</CardTitle>
                    <CardDescription>
                        {/* show range e.g. "November 2025 → March 2026" */}
                        {lastFiveData[0].label} → {lastFiveData[lastFiveData.length - 1].label}
                    </CardDescription>
                </div>

                {/* Month selector dropdown (controlled by activeKey state) */}
                <Select value={activeKey} onValueChange={setActiveKey}>
                    <SelectTrigger className="ml-auto h-7 w-[150px] rounded-lg pl-2.5">
                        <SelectValue placeholder="Select month" />
                    </SelectTrigger>

                    <SelectContent align="end" className="rounded-xl">
                        {coloredData.map((item) => {
                            const key = `${item.year}-${item.monthNumber}`
                            return (
                                <SelectItem key={key} value={key}>
                                    <div className="flex items-center gap-2 text-xs">
                                        {/* Colored dot matching the pie slice color */}
                                        <span
                                            className="h-3 w-3 rounded-xs"
                                            style={{ backgroundColor: item.fill }}
                                        />
                                        {/* Month label, e.g. "January 2026" */}
                                        {item.label}
                                    </div>
                                </SelectItem>
                            )
                        })}
                    </SelectContent>
                </Select>
            </CardHeader>

            {/* Body with the actual chart */}
            <CardContent className="flex flex-1 justify-center pb-0">
                {/* ChartContainer from your UI lib adds padding, axes styles, etc. */}
                <ChartContainer
                    id={id}
                    config={chartConfig}
                    className="mx-auto aspect-square w-full max-w-[300px]"
                >
                    <PieChart>
                        {/* Tooltip shown on hover */}
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />

                        {/* Pie itself */}
                        <Pie
                            data={coloredData}        // our array with fill + desktop + label
                            dataKey="matches"       // which field to use for the slice size
                            nameKey="label"           // which field to show as the name
                            innerRadius={60}          // donut hole radius
                            strokeWidth={5}           // stroke around slices
                            activeIndex={activeIndex} // which slice is "active" (hover / selected)
                            activeShape={({
                                outerRadius = 0,
                                ...props
                            }: PieSectorDataItem) => (
                                // Custom active shape: 2 concentric sectors for a nice highlight
                                <g>
                                    <Sector {...props} outerRadius={outerRadius + 10} />
                                    <Sector
                                        {...props}
                                        outerRadius={outerRadius + 25}
                                        innerRadius={outerRadius + 12}
                                    />
                                </g>
                            )}
                        >
                            {/* Center label showing the value of the active slice */}
                            <Label
                                content={({ viewBox }) => {
                                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                        return (
                                            <text
                                                x={viewBox.cx}
                                                y={viewBox.cy}
                                                textAnchor="middle"
                                                dominantBaseline="middle"
                                            >
                                                {/* Big number (desktop value) */}
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={viewBox.cy}
                                                    className="fill-foreground text-3xl font-bold"
                                                >
                                                    {activeItem.matches.toLocaleString()}
                                                </tspan>

                                                {/* Small label under it */}
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 24}
                                                    className="fill-muted-foreground"
                                                >
                                                    Matches
                                                </tspan>
                                            </text>
                                        )
                                    }
                                    return null
                                }}
                            />
                        </Pie>
                    </PieChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
