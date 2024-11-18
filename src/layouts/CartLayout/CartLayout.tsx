import CartHeader from '../../components/CartHeader'
import Footer from '../../components/Footer'

interface Props {
  readonly children?: React.ReactNode
}
export default function MainLayout({ children }: Props) {
  return (
    <div>
      <CartHeader />
      {children}
      <Footer />
    </div>
  )
}
