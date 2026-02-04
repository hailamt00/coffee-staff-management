import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { loginApi } from '../api/auth.api'
import { loginSuccess } from '../slices/authSlice'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { Card, CardContent, CardHeader } from '@/shared/ui/card'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogin = async () => {
    setError('')

    if (!username.trim() || !password.trim()) {
      setError('Username and Password are required!')
      return
    }

    try {
      setLoading(true)
      const data = await loginApi({
        username: username.trim(),
        password,
      })
      dispatch(loginSuccess(data))
      navigate('/dashboard')
    } catch {
      setError('Invalid Username or Password!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="
        min-h-screen
        flex items-center justify-center
        bg-slate-100 dark:bg-black
        px-4
      "
    >
      <Card
        className="
          w-full max-w-sm
          rounded-2xl
          border border-slate-200 dark:border-neutral-800
          bg-white dark:bg-black
        "
      >
        <CardHeader className="text-center space-y-1">
          <h1 className="text-2xl font-semibold text-black dark:text-white">
            Admin Login
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Coffee Staff Management
          </p>
        </CardHeader>

        <CardContent className="space-y-4">
          <Input
            placeholder="Username"
            className="
              h-11
              bg-white dark:bg-neutral-900
              border-slate-200 dark:border-neutral-800
              text-black dark:text-white
              placeholder:text-slate-400 dark:placeholder:text-slate-500
            "
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <Input
            type="password"
            placeholder="Password"
            className="
              h-11
              bg-white dark:bg-neutral-900
              border-slate-200 dark:border-neutral-800
              text-black dark:text-white
              placeholder:text-slate-400 dark:placeholder:text-slate-500
            "
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleLogin()
            }}
          />

          {error && (
            <p className="text-sm text-red-500 text-center">
              {error}
            </p>
          )}

          <Button
            disabled={loading}
            onClick={handleLogin}
            className="
              w-full h-11 rounded-xl
              bg-black text-white
              hover:bg-slate-900
              dark:bg-white dark:text-black
              dark:hover:bg-slate-200
              transition
            "
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </Button>

          <p className="text-center text-xs text-slate-400 dark:text-slate-500">
            Restricted area – Admin only
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

