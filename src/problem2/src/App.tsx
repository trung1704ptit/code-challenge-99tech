import SwapForm from './components/SwapForm'

function App() {
  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 relative bg-fixed bg-center bg-cover"
      style={{ backgroundImage: 'url(/background.webp)' }}
    >
      {/* Content */}
      <div className="relative z-10 w-full">
        <SwapForm />
      </div>
    </div>
  )
}

export default App