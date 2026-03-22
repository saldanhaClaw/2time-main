'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container flex items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <Link href="/" className="text-xl font-bold text-gray-900">2timeweb</Link>
        </div>
        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/services" className="text-gray-600 hover:text-gray-900 font-medium">Services</Link>
          <Link href="/portfolio" className="text-gray-600 hover:text-gray-900 font-medium">Portfolio</Link>
          <Link href="/blog" className="text-gray-600 hover:text-gray-900 font-medium">Blog</Link>
          <Link href="/contact" className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition">
            Get Started
          </Link>
        </nav>
        {/* Desktop Contact */}
        <div className="hidden md:flex items-center gap-4">
          <a href="sms:+15512982976468" className="inline-flex items-center gap-2 text-gray-600 hover:text-primary-600 font-medium">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
            Text Us
          </a>
          <a href="https://wa.me/15512982976468" className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-medium">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.438-.004 6.554-5.338 11.891-11.893 11.891-1.841-.001-3.568-.683-4.951-1.899l-6.345 1.64-2.833-2.834c1.791-.682 3.499-1.651 4.891-2.923.579-.53 1.072-1.169 1.432-1.877.403-.793.636-1.654.636-2.55 0-2.702-2.094-4.902-4.688-4.902-2.553 0-4.682 2.133-4.682 4.882 0 .536.105 1.048.29 1.515.151.381.363.731.62 1.037l3.395 3.298-1.415 1.414 4.374 4.374 2-2c.54.176 1.099.291 1.658.291 1.326 0 2.613-.577 3.538-1.613.362-.403.678-.874.909-1.361l2.492-7.826-7.825 2.492c-.488.231-.959.547-1.361.91-.87.833-1.484 1.873-1.613 3.202-.398 2.202.054 4.248 1.603 5.754 1.018 1.008 2.355 1.553 3.757 1.553 2.50 0 4.902-1.827 5.306-4.312l1.953-6.125-6.125 1.954c-1.257.399-2.287 1.158-2.853 2.132l-1.168 2.134z"/></svg>
            WhatsApp
          </a>
        </div>
        {/* Mobile menu button */}
        <button
          className="md:hidden text-gray-600"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
      {/* Mobile Menu */}
      <div className={`md:hidden ${menuOpen ? 'block' : 'hidden'} bg-white border-t border-gray-200`}>
        <div className="container flex flex-col p-4 space-y-4">
          <Link href="/services" className="text-gray-600 hover:text-gray-900 font-medium">Services</Link>
          <Link href="/portfolio" className="text-gray-600 hover:text-gray-900 font-medium">Portfolio</Link>
          <Link href="/blog" className="text-gray-600 hover:text-gray-900 font-medium">Blog</Link>
          <Link href="/contact" className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition text-center">
            Get Started
          </Link>
          <div className="flex items-center gap-4 pt-2 border-t border-gray-100">
            <Link href="sms:+15512982976468" className="inline-flex items-center gap-2 text-gray-600 hover:text-primary-600 font-medium">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
              Text Us
            </Link>
            <Link href="https://wa.me/15512982976468" className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-medium">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.438-.004 6.554-5.338 11.891-11.893 11.891-1.841-.001-3.568-.683-4.951-1.899l-6.345 1.64-2.833-2.834c1.791-.682 3.499-1.651 4.891-2.923.579-.53 1.072-1.169 1.432-1.877.403-.793.636-1.654.636-2.55 0-2.702-2.094-4.902-4.688-4.902-2.553 0-4.682 2.133-4.682 4.882 0 .536.105 1.048.29 1.515.151.381.363.731.62 1.037l3.395 3.298-1.415 1.414 4.374 4.374 2-2c.54.176 1.099.291 1.658.291 1.326 0 2.613-.577 3.538-1.613.362-.403.678-.874.909-1.361l2.492-7.826-7.825 2.492c-.488.231-.959.547-1.361.91-.87.833-1.484 1.873-1.613 3.202-.398 2.202.054 4.248 1.603 5.754 1.018 1.008 2.355 1.553 3.757 1.553 2.50 0 4.902-1.827 5.306-4.312l1.953-6.125-6.125 1.954c-1.257.399-2.287 1.158-2.853 2.132l-1.168 2.134z"/></svg>
              WhatsApp
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
