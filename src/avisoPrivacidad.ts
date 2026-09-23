import { mountNavbar } from './components/Navbar'
import { mountPrivacy } from './components/Privacy'
import { mountFooter } from './components/Footer'
import './css/base.css'
import './css/components.css'
import './css/sections.css'
import './css/specialtyPage.css'
import './css/legalPage.css'

document.addEventListener('DOMContentLoaded', () => {
  mountNavbar('navbar')
  mountPrivacy('privacy')
  mountFooter('footer')
})
