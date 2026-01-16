import { useEffect, useState } from 'react';

interface Heading {
	depth: number;
	slug: string;
	text: string;
}

interface TableOfContentsProps {
	headings: Heading[];
}

export default function TableOfContents({ headings }: TableOfContentsProps) {
	const [activeId, setActiveId] = useState<string>('');
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		// Only show h2 and h3 headings
		const filteredHeadings = headings.filter((h) => h.depth === 2 || h.depth === 3);

		if (filteredHeadings.length === 0) return;

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						setActiveId(entry.target.id);
					}
				});
			},
			{
				rootMargin: '-100px 0px -66%',
				threshold: 1,
			}
		);

		// Observe all headings
		filteredHeadings.forEach((heading) => {
			const element = document.getElementById(heading.slug);
			if (element) {
				observer.observe(element);
			}
		});

		return () => observer.disconnect();
	}, [headings]);

	const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, slug: string) => {
		e.preventDefault();
		const element = document.getElementById(slug);
		if (element) {
			const top = element.offsetTop - 100;
			window.scrollTo({ top, behavior: 'smooth' });
			setActiveId(slug);
			// Close mobile menu after click
			setIsOpen(false);
		}
	};

	// Filter to only show h2 and h3
	const filteredHeadings = headings.filter((h) => h.depth === 2 || h.depth === 3);

	if (filteredHeadings.length === 0) {
		return null;
	}

	return (
		<>
			{/* Mobile: Collapsible Button */}
			<div className="lg:hidden mb-8">
				<button
					onClick={() => setIsOpen(!isOpen)}
					className="flex items-center justify-between w-full px-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors border border-gray-200"
					aria-expanded={isOpen}
				>
					<span className="font-medium text-gray-900">Table of Contents</span>
					<svg
						className={`w-5 h-5 text-gray-600 transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
					</svg>
				</button>

				{isOpen && (
					<nav className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
						<ul className="space-y-2">
							{filteredHeadings.map((heading) => (
								<li key={heading.slug} style={{ paddingLeft: `${(heading.depth - 2) * 1}rem` }}>
									<a
										href={`#${heading.slug}`}
										onClick={(e) => handleClick(e, heading.slug)}
										className={`block py-1 text-sm transition-colors ${
											activeId === heading.slug
												? 'text-blue-600 font-medium'
												: 'text-gray-600 hover:text-blue-600'
										}`}
									>
										{heading.text}
									</a>
								</li>
							))}
						</ul>
					</nav>
				)}
			</div>

			{/* Desktop: Sticky Sidebar */}
			<nav className="hidden lg:block sticky top-24 max-h-[calc(100vh-8rem)] overflow-auto">
				<h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wide">
					On This Page
				</h3>
				<ul className="space-y-2 border-l-2 border-gray-200">
					{filteredHeadings.map((heading) => (
						<li key={heading.slug} style={{ paddingLeft: `${(heading.depth - 2) * 0.75 + 0.75}rem` }}>
							<a
								href={`#${heading.slug}`}
								onClick={(e) => handleClick(e, heading.slug)}
								className={`block py-1 text-sm border-l-2 -ml-0.5 transition-all ${
									activeId === heading.slug
										? 'text-blue-600 font-medium border-blue-600'
										: 'text-gray-600 hover:text-blue-600 border-transparent hover:border-gray-300'
								}`}
							>
								{heading.text}
							</a>
						</li>
					))}
				</ul>
			</nav>
		</>
	);
}
