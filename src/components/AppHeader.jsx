/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Badge } from 'antd';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Shared Header Toolbar — Ultra-Premium Minimalist Stripe/Linear style.
 * Includes elegant keyboard shortcut badge (⌘K), dynamic border glows using accentColor,
 * and a premium double ringed avatar layout.
 */
export default function AppHeader({
  searchTerm,
  onSearchChange,
  avatarUrl,
  accentColor = '#ff5c00',
  children,
}) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <motion.header 
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="flex gap-4 justify-between items-center w-full bg-transparent select-none"
    >
      {/* Background radial accent glow light */}
      <div 
        className="absolute top-0 right-1/4 w-80 h-80 rounded-full blur-[110px] pointer-events-none -z-10 transition-colors duration-500" 
        style={{ backgroundColor: `${accentColor}06` }}
      />

      {/* Modern Capsule Search Bar */}
      <div className="relative w-full max-w-sm">
        <motion.div
          animate={{
            borderColor: isFocused ? accentColor : 'rgba(0, 0, 0, 0.05)',
            boxShadow: isFocused 
              ? `0 0 20px ${accentColor}12`
              : '0 0 0px rgba(0, 0, 0, 0)',
            scale: isFocused ? 1.015 : 1
          }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-white border shadow-sm transition-all relative"
        >
          <i 
            className="bi bi-search transition-colors duration-300 text-[13px] shrink-0" 
            style={{ color: isFocused ? accentColor : 'rgba(0, 0, 0, 0.35)' }}
          />
          
          <input
            type="text"
            placeholder="Tìm tài liệu, giáo trình học tập..."
            value={searchTerm || ''}
            onChange={(e) => onSearchChange(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="w-full bg-transparent border-none text-black text-[12.5px] font-semibold placeholder-black/30 outline-none pr-12"
          />

          <div className="absolute right-4 flex items-center gap-1.5 pointer-events-none">
            <AnimatePresence mode="wait">
              {searchTerm ? (
                <motion.button
                  key="clear-btn"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={() => onSearchChange('')}
                  className="text-black/35 hover:text-black pointer-events-auto cursor-pointer flex items-center justify-center mr-1"
                >
                  <i className="bi bi-x-circle-fill text-[12.5px]" />
                </motion.button>
              ) : (
                <motion.div
                  key="k-badge"
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.85 }}
                  className="px-2 py-0.5 rounded-md bg-black/[0.04] border border-black/[0.03] text-[9.5px] font-black text-black/30 tracking-tight flex items-center gap-0.5 select-none"
                >
                  <span>⌘</span>
                  <span>K</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      <div className="flex items-center gap-4.5">
        {children}

        {/* Premium Notifications Bell */}
        <Badge dot color={accentColor} offset={[-1.5, 1.5]}>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-8.5 h-8.5 bg-white hover:bg-black/[0.015] rounded-full text-black/60 hover:text-black transition-colors border border-black/[0.04] shadow-sm flex items-center justify-center cursor-pointer relative"
          >
            <i className="bi bi-bell text-[14px]" />
          </motion.button>
        </Badge>

        <div className="h-4.5 w-[1.5px] bg-black/[0.06] mx-0.5" />

        {/* Premium Double Ringed Circular Profile Avatar */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-8.5 h-8.5 rounded-full overflow-hidden shadow-sm flex items-center justify-center bg-white cursor-pointer relative p-[1.5px] transition-all"
          style={{ border: `1.5px solid ${accentColor}30` }}
        >
          <div className="w-full h-full rounded-full overflow-hidden">
            <img 
              src={avatarUrl} 
              alt="Avatar" 
              className="w-full h-full object-cover" 
            />
          </div>
        </motion.div>
      </div>
    </motion.header>
  );
}
