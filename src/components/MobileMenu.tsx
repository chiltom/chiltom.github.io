import { useState } from 'react';
import { SOCIAL_LINKS } from '../consts';

export default function MobileMenu() {
	const [isOpen, setIsOpen] = useState(false);

	const toggleMenu = () => {
		setIsOpen(!isOpen);
		// Prevent body scroll when menu is open
		if (!isOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'unset';
		}
	};

	const closeMenu = () => {
		setIsOpen(false);
		document.body.style.overflow = 'unset';
	};

	return (
		<>
			{/* Hamburger Button */}
			<button
				onClick={toggleMenu}
				className="md:hidden text-gray-700 hover:text-blue-600 transition-colors p-2"
				aria-label="Toggle menu"
				aria-expanded={isOpen}
			>
				<div className="w-6 h-6 relative flex flex-col justify-center items-center">
					{/* Top line */}
					<span
						className={`absolute h-0.5 w-6 bg-current transform transition-all duration-300 ${
							isOpen ? 'rotate-45' : '-translate-y-2'
						}`}
					/>
					{/* Middle line */}
					<span
						className={`absolute h-0.5 w-6 bg-current transition-all duration-300 ${
							isOpen ? 'opacity-0' : 'opacity-100'
						}`}
					/>
					{/* Bottom line */}
					<span
						className={`absolute h-0.5 w-6 bg-current transform transition-all duration-300 ${
							isOpen ? '-rotate-45' : 'translate-y-2'
						}`}
					/>
				</div>
			</button>

			{/* Overlay */}
			{isOpen && (
				<div
					className="fixed inset-0 bg-black/50 z-40 md:hidden"
					onClick={closeMenu}
					aria-hidden="true"
				/>
			)}

			{/* Menu Panel */}
			<div
				className={`fixed right-0 top-0 h-full w-64 bg-white shadow-xl z-50 transform transition-transform duration-300 md:hidden ${
					isOpen ? 'translate-x-0' : 'translate-x-full'
				}`}
			>
				<div className="flex flex-col h-full">
					{/* Close button */}
					<div className="flex justify-end p-4 border-b border-gray-200">
						<button
							onClick={closeMenu}
							className="text-gray-700 hover:text-blue-600 transition-colors p-2"
							aria-label="Close menu"
						>
							<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
							</svg>
						</button>
					</div>

					{/* Navigation Links */}
					<nav className="flex-1 p-6">
						<ul className="space-y-4">
							<li>
								<a
									href="/blog"
									onClick={closeMenu}
									className="block text-lg font-medium text-gray-700 hover:text-blue-600 transition-colors py-2"
								>
									Blog
								</a>
							</li>
							<li>
								<a
									href="/about"
									onClick={closeMenu}
									className="block text-lg font-medium text-gray-700 hover:text-blue-600 transition-colors py-2"
								>
									About
								</a>
							</li>
						</ul>
					</nav>

					{/* Social Links */}
					<div className="p-6 border-t border-gray-200">
						<p className="text-sm font-medium text-gray-500 mb-4">Connect</p>
						<div className="flex gap-4">
							{SOCIAL_LINKS.map((link) => (
								<a
									key={link.name}
									href={link.url}
									target={link.icon !== 'rss' ? '_blank' : undefined}
									rel={link.icon !== 'rss' ? 'noopener noreferrer' : undefined}
									className="text-gray-600 hover:text-blue-600 transition-colors"
									aria-label={link.name}
								>
									{link.icon === 'github' && (
										<svg viewBox="0 0 16 16" className="w-6 h-6" fill="currentColor">
											<path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
										</svg>
									)}
									{link.icon === 'linkedin' && (
										<svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
											<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
										</svg>
									)}
									{link.icon === 'email' && (
										<svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
											<path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
										</svg>
									)}
									{link.icon === 'rss' && (
										<svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
											<path d="M6.18 15.64a2.18 2.18 0 0 1 2.18 2.18C8.36 19 7.38 20 6.18 20C5 20 4 19 4 17.82a2.18 2.18 0 0 1 2.18-2.18M4 4.44A15.56 15.56 0 0 1 19.56 20h-2.83A12.73 12.73 0 0 0 4 7.27V4.44m0 5.66a9.9 9.9 0 0 1 9.9 9.9h-2.83A7.07 7.07 0 0 0 4 12.93V10.1z" />
										</svg>
									)}
								</a>
							))}
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
