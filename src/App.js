import { useState, useEffect } from "react"
import "./App.css"

const connect = async (onConnected) => {
  if (!window.ethereum) {
    alert("MetaMask not installed")
    return
  }

  const accounts = await window.ethereum.request({
    method: "eth_requestAccounts",
  })

  onConnected(accounts[0])
}

const isWalletConnected = async (onConnected) => {
  if (window.ethereum) {
    const accounts = await window.ethereum.request({
      method: "eth_accounts",
    })

    if (accounts.length > 0) {
      const account = accounts[0]
      onConnected(account)
      return
    }
  }
}

const Login = ({ setAddress }) => {
  return (
    <button onClick={() => connect(setAddress)} style={buttonStyle}>
      Connect to MetaMask
    </button>
  )
}

const buttonStyle = {
  padding: 20,
  backgroundColor: "#ff7b00",
  borderRadius: 10,
  borderWidth: 0,
  color: "#fff",
  fontSize: 50,
}

function App() {
  const [address, setAddress] = useState("")

  useEffect(() => {
    isWalletConnected(setAddress)
  }, [])

  return (
    <div style={containerStyle}>
      {address ? (
        <div style={connectedStyle}>Connected with {address}</div>
      ) : (
        <Login setAddress={setAddress} />
      )}
    </div>
  )
}

const connectedStyle = {
  fontSize: 50,
}

const containerStyle = {
  display: "flex",
  height: "100vh",
  alignItems: "center",
  justifyContent: "center",
}

export default App
