import './Footer.scss'

export default function Footer() {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} RealEstate Management System. All rights reserved.</p>
    </footer>
  )
}