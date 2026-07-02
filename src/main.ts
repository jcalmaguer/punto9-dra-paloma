import { mountNavbar } from './components/Navbar'
import { mountHero }   from './components/Hero'
import { mountSpecialties } from './components/Specialties'
import './css/base.css'
import './css/components.css'
import './css/sections.css'

document.addEventListener('DOMContentLoaded', () => {
  mountNavbar('navbar')
  mountHero('hero')
  mountSpecialties('specialties')
})