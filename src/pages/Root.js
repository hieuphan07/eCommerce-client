import { Outlet, useNavigation } from "react-router-dom"

import MainNavigation from "../MainNavigation/MainNavigation"
import Footer from "../components/Footer/Footer"

const RootLayout = () => {
  const navigation = useNavigation()
  return (
    <>
      <MainNavigation />
      <main>
        {navigation.state === "loading" && <p style={{ textAlign: 'center', marginBottom: '10px' }}>Loading...</p>}
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default RootLayout;