import { useState } from 'react';

interface CodeBlockProps {
	code: string;
	language?: string;
	className?: string;
}

export default function CodeBlock({ code, language, className = '' }: CodeBlockProps) {
	const [copied, setCopied] = useState(false);

	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(code);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		} catch (err) {
			console.error('Failed to copy code:', err);
		}
	};

	// Extract language from className if not provided (e.g., "language-javascript")
	const displayLanguage = language || className.replace('language-', '').toUpperCase();

	return (
		<div className="relative group">
			{/* Language Badge */}
			{displayLanguage && (
				<div className="absolute top-2 left-3 z-10">
					<span className="inline-block px-2 py-1 text-xs font-medium bg-gray-700 text-gray-300 rounded">
						{displayLanguage}
					</span>
				</div>
			)}

			{/* Copy Button */}
			<button
				onClick={handleCopy}
				className="absolute top-2 right-2 z-10 px-3 py-1 text-sm bg-gray-700 hover:bg-gray-600 text-white rounded opacity-0 group-hover:opacity-100 transition-all duration-200 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
				aria-label="Copy code to clipboard"
			>
				{copied ? (
					<span className="flex items-center gap-1">
						<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
						</svg>
						Copied!
					</span>
				) : (
					<span className="flex items-center gap-1">
						<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
							/>
						</svg>
						Copy
					</span>
				)}
			</button>

			{/* Code Content */}
			<pre className={className}>
				<code>{code}</code>
			</pre>
		</div>
	);
}
