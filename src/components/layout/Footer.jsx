const Footer = () => {
  const footerYear = new Date().getFullYear()
  return (
    <footer className='footer p-10 bg-gray-700 footer-center'>
      <div>
        <p>Copyright &copy;{footerYear} GitHub Finder</p>
        <p>All rights reserved</p>
      </div>
    </footer>
  )
}

export default Footer
