import { mountNavbar } from './components/Navbar'
import { mountSpecialtyDetail } from './components/SpecialtyDetail'
import { mountFooter } from './components/Footer'
import './css/base.css'
import './css/components.css'
import './css/sections.css'
import './css/specialtyPage.css'

document.addEventListener('DOMContentLoaded', () => {
  mountNavbar('navbar')
  mountSpecialtyDetail('specialty-detail')
  mountFooter('footer')
})
