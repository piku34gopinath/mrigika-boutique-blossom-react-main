import React, { useState, useRef, useEffect } from "react";
import { Play, Pause, RotateCcw } from "lucide-react";

const VideoSection: React.FC = () => {
	const [currentVideo, setCurrentVideo] = useState(0);
	const [isPlaying, setIsPlaying] = useState(false);
	const [isVisible, setIsVisible] = useState(false);
	const [isHovered, setIsHovered] = useState(false);
	const videoRef = useRef<HTMLVideoElement>(null);
	const sectionRef = useRef<HTMLElement>(null);

	const videos = [
		{
			title: "Odisha Handloom Weaving",
			description: "Traditional artisans creating beautiful textiles",
			src: "/video/video1.MP4",
			objectFit: "object-cover",
		},
		{
			title: "Finished Handloom Products",
			description: "Showcasing the beauty of completed sarees",
			src: "/video/video3.MP4",
			objectFit: "object-cover",
		},
		{
			title: "Finished Handloom Products",
			description: "Showcasing the beauty of completed sarees",
			src: "/video/video6.MP4",
			objectFit: "object-cover",
		},
	];

	// Intersection Observer for scroll detection
	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				setIsVisible(entry.isIntersecting);
			},
			{ threshold: 0.5 } // Trigger when 50% of the section is visible
		);

		if (sectionRef.current) {
			observer.observe(sectionRef.current);
		}

		return () => observer.disconnect();
	}, []);

	// Auto-play/pause based on visibility and hover
	useEffect(() => {
		if (videoRef.current) {
			if ((isVisible || isHovered) && !isPlaying) {
				videoRef.current
					.play()
					.then(() => {
						setIsPlaying(true);
					})
					.catch(() => {
						// Handle autoplay restrictions
						console.log("Autoplay prevented by browser");
					});
			} else if (!isVisible && !isHovered && isPlaying) {
				videoRef.current.pause();
				setIsPlaying(false);
			}
		}
	}, [isVisible, isHovered, isPlaying]);

	const togglePlay = () => {
		if (videoRef.current) {
			if (isPlaying) {
				videoRef.current.pause();
				setIsPlaying(false);
			} else {
				videoRef.current.play().then(() => {
					setIsPlaying(true);
				});
			}
		}
	};

	const nextVideo = () => {
		setCurrentVideo((prev) => (prev + 1) % videos.length);
		setIsPlaying(false);
	};

	const resetVideo = () => {
		if (videoRef.current) {
			videoRef.current.currentTime = 0;
			setIsPlaying(false);
		}
	};

	useEffect(() => {
		const video = videoRef.current;
		if (video) {
			video.addEventListener("ended", nextVideo);
			return () => video.removeEventListener("ended", nextVideo);
		}
	}, []);

	useEffect(() => {
		if (videoRef.current) {
			videoRef.current.load();
			setIsPlaying(false);
		}
	}, [currentVideo]);

	return (
		<section
			ref={sectionRef}
			className="py-16 bg-gradient-to-b from-background to-secondary/30"
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			<div className="container mx-auto px-4">
				<div className="text-center mb-8">
					<h2 className="text-4xl font-playfair font-bold mb-4 text-primary">
						The Art of Odisha Handloom
					</h2>
					<p className="text-lg text-muted-foreground max-w-2xl mx-auto">
						Witness the timeless craft of our skilled artisans as they weave
						magic into every thread
					</p>
				</div>

				<div className="max-w-4xl mx-auto">
					<div className="relative rounded-2xl overflow-hidden shadow-elegant">
						{/* Video Player */}
						<div className="aspect-video bg-black">
							<video
								ref={videoRef}
								className={`w-full h-full ${videos[currentVideo].objectFit}`}
								poster="https://via.placeholder.com/800x450/8B4513/FFFFFF?text=Loading+Video..."
								controls={false}
								muted
								loop={true}
							>
								<source src={videos[currentVideo].src} type="video/mp4" />
								Your browser does not support the video tag.
							</video>
						</div>

						{/* Video controls overlay */}
						<div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
							<div className="flex items-center gap-4">
								<button
									onClick={togglePlay}
									className="bg-white/90 hover:bg-white text-primary p-3 rounded-full transition-all duration-200 hover:scale-110"
								>
									{isPlaying ? (
										<Pause className="h-6 w-6" />
									) : (
										<Play className="h-6 w-6" />
									)}
								</button>
								<button
									onClick={resetVideo}
									className="bg-white/90 hover:bg-white text-primary p-3 rounded-full transition-all duration-200 hover:scale-110"
								>
									<RotateCcw className="h-6 w-6" />
								</button>
							</div>
						</div>

						{/* Video info */}
						<div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
							<h3 className="text-white font-playfair text-xl font-semibold mb-2">
								{videos[currentVideo].title}
							</h3>
							<p className="text-white/90">
								{videos[currentVideo].description}
							</p>
						</div>

						{/* Video indicators */}
						<div className="absolute top-4 right-4 flex gap-2">
							{videos.map((_, index) => (
								<button
									key={index}
									onClick={() => setCurrentVideo(index)}
									className={`w-3 h-3 rounded-full transition-all duration-200 ${
										index === currentVideo
											? "bg-white"
											: "bg-white/50 hover:bg-white/70"
									}`}
								/>
							))}
						</div>
					</div>

					{/* Note about videos */}
					<div className="mt-6 text-center">
						<p className="text-sm text-muted-foreground italic">
							Sample videos for demonstration. Replace with actual handloom
							weaving videos in production.
						</p>
					</div>
				</div>
			</div>
		</section>
	);
};

export default VideoSection;
