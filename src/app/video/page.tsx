
async function VideoPage() {
    return (<video
        width="100%"
        height="100%"
        autoPlay
        muted
        loop
        playsInline
        preload="none"
    >
        <source src="/naji.mp4" type="video/mp4" />
        Your browser does not support the video tag.
    </video>
    )
}

export default VideoPage;
