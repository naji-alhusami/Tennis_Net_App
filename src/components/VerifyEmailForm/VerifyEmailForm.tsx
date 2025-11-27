// // 'use client'
// // import Link from "next/link";
// // import { useSearchParams } from "next/navigation";
// // import { useCallback, useEffect, useState } from "react";

// // import { Button } from "../ui/button";
// // import { Spinner } from "../ui/spinner";
// // import { newVerification } from "../../../actions/newVerification";

// // export default function VerifyEmailForm() {
// //     const [success, setSuccess] = useState<string | undefined>(undefined)
// //     const [error, setError] = useState<string | undefined>(undefined)

// //     const searchParams = useSearchParams();
// //     const token = searchParams.get("token")

// //     const onSubmit = useCallback(() => {
// //         if (success || error) {
// //             return
// //         }

// //         if (!token) {
// //             setError("No Token Provided")
// //             return
// //         }

// //         newVerification(token).then((data) => {
// //             if (data.success) {
// //                 setSuccess(data.success)
// //             }

// //             if (data.error) {
// //                 setError(data.error)
// //             }
// //         })

// //     }, [token, success, error])

// //     useEffect(() => {
// //         onSubmit()
// //     }, [])


// //     return (<div className="w-full max-w-xl rounded-2xl bg-white/85 backdrop-blur-sm shadow-xl border border-gray-200 p-8 sm:p-10">
// //         <div className="flex flex-col items-center justify-center gap-y-15">
// //             <h1 className="font-bold text-2xl md:text-3xl text-center">Confirming Your Email ....</h1>
// //             <Spinner className="size-20 text-green-500" />
// //         </div>
// //         <Link href='/auth/login' className="cursor-pointer">
// //             <Button variant="outline" className="cursor-pointer w-full bg-green-600 hover:bg-green-700 font-bold text-white hover:text-white mt-20">
// //                 Go To Login
// //             </Button>
// //         </Link>
// //     </div>)
// // }

// 'use client';

// import Link from "next/link";
// import { useSearchParams } from "next/navigation";
// import { useEffect, useState } from "react";

// import { Button } from "../ui/button";
// import { Spinner } from "../ui/spinner";
// import { newVerification } from "../../../actions/newVerification";

// export default function VerifyEmailForm() {
//   const [success, setSuccess] = useState<string | undefined>();
//   const [error, setError] = useState<string | undefined>();

//   const searchParams = useSearchParams();
//   const token = searchParams.get("token");

//   useEffect(() => {
//     // if we already have a result, don't run again
//     if (success || error) return;

//     // no token: handle in render instead of state
//     if (!token) return;

//     let cancelled = false;

//     (async () => {
//       try {
//         const data = await newVerification(token);

//         if (cancelled) return;

//         if (data.success) setSuccess(data.success);
//         if (data.error) setError(data.error);
//       } catch {
//         if (!cancelled) setError("Something went wrong while verifying your email.");
//       }
//     })();

//     return () => {
//       cancelled = true;
//     };
//   }, [token, success, error]);

//   // no token in URL: render an error directly (no state needed)
//   if (!token) {
//     return (
//       <div className="w-full max-w-xl rounded-2xl bg-white/85 backdrop-blur-sm shadow-xl border border-gray-200 p-8 sm:p-10">
//         <h1 className="font-bold text-2xl md:text-3xl text-center mb-6">
//           Invalid verification link
//         </h1>
//         <p className="text-center text-sm text-red-600 mb-8">
//           No token was provided in the URL. Please use the latest verification link you received.
//         </p>
//         <Link href="/auth/login">
//           <Button className="w-full bg-green-600 hover:bg-green-700 font-bold text-white">
//             Go to Login
//           </Button>
//         </Link>
//       </div>
//     );
//   }

//   // loading state
//   if (!success && !error) {
//     return (
//       <div className="w-full max-w-xl rounded-2xl bg-white/85 backdrop-blur-sm shadow-xl border border-gray-200 p-8 sm:p-10">
//         <div className="flex flex-col items-center justify-center gap-y-6">
//           <h1 className="font-bold text-2xl md:text-3xl text-center">
//             Confirming Your Email…
//           </h1>
//           <Spinner className="size-20 text-green-500" />
//         </div>
//       </div>
//     );
//   }

//   // success / error result
//   return (
//     <div className="w-full max-w-xl rounded-2xl bg-white/85 backdrop-blur-sm shadow-xl border border-gray-200 p-8 sm:p-10">
//       <h1 className="font-bold text-2xl md:text-3xl text-center mb-6">
//         {success ? "Email verified 🎉" : "Verification failed"}
//       </h1>

//       {success && (
//         <p className="text-center text-sm text-green-700 mb-8">
//           {success}
//         </p>
//       )}

//       {error && (
//         <p className="text-center text-sm text-red-600 mb-8">
//           {error}
//         </p>
//       )}

//       <Link href="/auth/login">
//         <Button className="w-full bg-green-600 hover:bg-green-700 font-bold text-white">
//           Go to Login
//         </Button>
//       </Link>
//     </div>
//   );
// }

"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";

type VerifyEmailFormProps = {
    success?: string;
    error?: string;
};

export default function VerifyEmailForm({ success, error }: VerifyEmailFormProps) {
    const hasError = !!error && !success;

    if (!success && !error) {
        return (
            <div className="w-full max-w-xl rounded-2xl bg-white/85 backdrop-blur-sm shadow-xl border border-gray-200 p-8 sm:p-10">
                <div className="flex flex-col items-center justify-center gap-y-6">
                    <h1 className="font-bold text-2xl md:text-3xl text-center">
                        Confirming Your Email…
                    </h1>
                    <Spinner className="size-20 text-green-500" />
                </div>
            </div>
        );
    }

    return (
        <div className="w-full max-w-xl rounded-2xl bg-white/85 backdrop-blur-sm shadow-xl border border-gray-200 p-8 sm:p-10">
            <h1 className="font-bold text-2xl md:text-3xl text-center mb-6">
                {success ? "Email verified 🎉" : "Verification failed"}
            </h1>

            {success && (
                <p className="text-center text-sm text-green-700 mb-8">
                    {success}
                </p>
            )}

            {hasError && (
                <p className="text-center text-sm text-red-600 mb-8">
                    {error}
                </p>
            )}

            {success && (<Link href="/auth/login">
                <Button className="w-full bg-green-600 hover:bg-green-700 font-bold text-white">
                    Go to Login
                </Button>
            </Link>)}
        </div>
    );
}
