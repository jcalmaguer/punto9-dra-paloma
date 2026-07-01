import './style.css'
import { mountNavbar } from './components/Navbar'
import { mountHero }   from './components/Hero'
import './css/navbar.css'
import './css/hero.css'

document.addEventListener('DOMContentLoaded', () => {
  mountNavbar('navbar')
  mountHero('hero')
})