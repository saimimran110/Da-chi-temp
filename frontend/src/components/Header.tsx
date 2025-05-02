import type React from "react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, ShoppingCart, Search, User, Heart, Moon, Sun } from "lucide-react"
import { useNavigate } from "react-router-dom"

interface HeaderProps {
  logo: string
  brandName: React.ReactNode
  links: Array<{ name: string; id: string; href: string }>
  onLinkClick?: (href: string) => void
  isDarkMode?: boolean
  toggleDarkMode?: () => void
}

const Header: React.FC<HeaderProps> = ({ logo, brandName, links, onLinkClick, isDarkMode = false, toggleDarkMode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const navigate = useNavigate()

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen)

  const handleNavigation = (href: string) => {
    if (onLinkClick) {
      onLinkClick(href)
    } else {
      navigate(href)
    }
    setIsMenuOpen(false)
  }

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setIsScrolled(scrollPosition > 50)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <motion.header
        className="fixed w-full z-50"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Announcement strip */}
        <motion.div
          className="bg-black text-white text-center py-2 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Free shipping on all orders over Rs 3000
        </motion.div>

        {/* Main header */}
        <motion.div
          className={`w-full transition-all duration-300 ${
            isScrolled ? "bg-white shadow-md py-2" : "bg-white/80 backdrop-blur-md py-4"
          }`}
        >
          <div className="container mx-auto px-4 flex items-center justify-between">
            {/* Logo and brand name */}
            <div className="flex items-center space-x-3">
              <motion.img
                src={logo || "/placeholder.svg"}
                alt="Brand Logo"
                className="w-10 h-10 rounded-full object-cover cursor-pointer"
                onClick={() => handleNavigation("/")}
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              />
              <motion.div
                className="text-xl md:text-2xl font-bold cursor-pointer"
                onClick={() => handleNavigation("/")}
                whileHover={{ scale: 1.05 }}
              >
                {brandName}
              </motion.div>
            </div>

            {/* Desktop navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {links.map((link) => (
                <motion.button
                  key={link.id}
                  onClick={() => handleNavigation(link.href)}
                  className="relative text-gray-700 hover:text-black transition-colors text-sm uppercase tracking-wider font-medium"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  {link.name}
                  <motion.div
                    className="absolute bottom-0 left-0 w-0 h-0.5 bg-black"
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.2 }}
                  />
                </motion.button>
              ))}
            </nav>

            {/* Action icons */}
            <div className="flex items-center space-x-4">
              <motion.button
                onClick={toggleSearch}
                className="text-gray-700 hover:text-black transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Search className="w-5 h-5" />
              </motion.button>

              <motion.button
                onClick={() => handleNavigation("/wishlist")}
                className="text-gray-700 hover:text-black transition-colors hidden sm:block"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Heart className="w-5 h-5" />
              </motion.button>

              <motion.button
                onClick={() => handleNavigation("/account")}
                className="text-gray-700 hover:text-black transition-colors hidden sm:block"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <User className="w-5 h-5" />
              </motion.button>

              <motion.button
                onClick={() => handleNavigation("/cart")}
                className="text-gray-700 hover:text-black transition-colors relative"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <ShoppingCart className="w-5 h-5" />
                <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  0
                </span>
              </motion.button>

              {toggleDarkMode && (
                <motion.button
                  onClick={toggleDarkMode}
                  className="text-gray-700 hover:text-black transition-colors hidden sm:block"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </motion.button>
              )}

              <motion.button
                onClick={toggleMenu}
                className="md:hidden text-gray-700 hover:text-black transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Menu className="w-6 h-6" />
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Search overlay */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 w-full bg-white shadow-md py-4 px-4"
            >
              <div className="container mx-auto flex items-center">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full py-2 px-4 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  autoFocus
                />
                <button className="bg-black text-white py-2 px-4 rounded-r-md hover:bg-gray-800 transition-colors">
                  <Search className="w-5 h-5" />
                </button>
                <button onClick={toggleSearch} className="ml-4 text-gray-700 hover:text-black transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={toggleMenu}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="absolute inset-y-0 right-0 w-72 bg-white shadow-xl p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-8">
                <div className="text-xl font-bold">{typeof brandName === "string" ? brandName : "Da-chi"}</div>
                <button onClick={toggleMenu} className="text-gray-700 hover:text-black transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <nav className="flex flex-col space-y-6">
                {links.map((link) => (
                  <motion.button
                    key={link.id}
                    onClick={() => handleNavigation(link.href)}
                    className="text-gray-700 hover:text-black transition-colors text-lg font-medium"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    {link.name}
                  </motion.button>
                ))}
              </nav>

              <div className="mt-auto pt-8 border-t border-gray-200 mt-8">
                <div className="flex flex-col space-y-4">
                  <button
                    onClick={() => {
                      handleNavigation("/account")
                    }}
                    className="flex items-center space-x-2 text-gray-700 hover:text-black transition-colors"
                  >
                    <User className="w-5 h-5" />
                    <span>My Account</span>
                  </button>

                  <button
                    onClick={() => {
                      handleNavigation("/wishlist")
                    }}
                    className="flex items-center space-x-2 text-gray-700 hover:text-black transition-colors"
                  >
                    <Heart className="w-5 h-5" />
                    <span>Wishlist</span>
                  </button>

                  {toggleDarkMode && (
                    <button
                      onClick={toggleDarkMode}
                      className="flex items-center space-x-2 text-gray-700 hover:text-black transition-colors"
                    >
                      {isDarkMode ? (
                        <>
                          <Sun className="w-5 h-5" />
                          <span>Light Mode</span>
                        </>
                      ) : (
                        <>
                          <Moon className="w-5 h-5" />
                          <span>Dark Mode</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer to prevent content from being hidden under the fixed header */}
      <div className="h-[88px]"></div>
    </>
  )
}

export default Header
