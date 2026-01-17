import { useEffect, useState } from 'react';

export default function ReadingProgress() {
	const [progress, setProgress] = useState(0);

	useEffect(() => {
		const updateProgress = () => {
			const scrollTop = window.scrollY;
			const docHeight = document.documentElement.scrollHeight - window.innerHeight;
			const scrollPercent = (scrollTop / docHeight) * 100;
			setProgress(Math.min(scrollPercent, 100));
		};

		// Update on mount
		updateProgress();

		// Update on scroll
		window.addEventListener('scroll', updateProgress, { passive: true });

		// Cleanup
		return () => window.removeEventListener('scroll', updateProgress);
	}, []);

	return (
		<div
			className="fixed top-0 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-800 z-50"
			role="progressbar"
			aria-valuenow={Math.round(progress)}
			aria-valuemin={0}
			aria-valuemax={100}
			aria-label="Reading progress"
		>
			<div
				className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 transition-all duration-150 ease-out"
				style={{ width: `${progress}%` }}
			/>
		</div>
	);
}
