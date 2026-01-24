import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router'
import Header from './Components/MainLayout/Header'
import Footer from './Components/MainLayout/Footer'
import ScrollToTop from "./Utils/scrollToTop"
import { useDispatch, useSelector } from 'react-redux'
import { fetchLandingPageData, clearLandingPageError } from './Redux/Slice/landingPageSlice'
import { Bounce, ToastContainer } from 'react-toastify'

const RootLayout = () => {
  const dispatch = useDispatch()
  const { data: landingData, loading, error } = useSelector((state) => state?.landingPageData || {})
  const [retryCount, setRetryCount] = useState(0)
  const MAX_RETRIES = 3

  useEffect(() => {
    const fetchData = async () => {
      // Only fetch if data doesn't exist and we haven't exceeded max retries
      if (!landingData && retryCount < MAX_RETRIES) {
        try {
          await dispatch(fetchLandingPageData()).unwrap()
        } catch (err) {
          // Error will be handled by Redux state
          if (retryCount < MAX_RETRIES - 1) {
            // Auto-retry after delay on first attempts
            const delayMs = 1000 * (retryCount + 1);
            setTimeout(() => {
              setRetryCount(prev => prev + 1);
            }, delayMs);
          }
        }
      }
    }

    fetchData()
  }, [dispatch, landingData, retryCount])

  // Clear error after display timeout
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        dispatch(clearLandingPageError())
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [error, dispatch])

  return (
    <div>
      <Header />
      <ScrollToTop />
      <ToastContainer
        style={{ zIndex: 999999999 }}
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <Outlet />
      <Footer />
    </div>
  )
}

export default RootLayout