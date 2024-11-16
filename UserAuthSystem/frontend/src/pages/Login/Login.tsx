import React, { useState } from "react";
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { BottomGradient, LabelInputContainer } from "../Register/Register"
import axios from "axios";
import { useToast } from "../../hooks/use-toast";
import { useNavigate } from "react-router-dom";

function Login() {
    const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {toast} = useToast()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    try {
        await axios.post("http://localhost:8000/api/v1/users/login", {username, email, password}, {withCredentials: true})

        toast({
            title: "Success",
            description: "User registered successfully",
          });

          navigate('/dashboard')
    } catch (error) {
        
    }
  }
  return (
    <div className="dark:bg-slate-900 h-screen pt-10">
      <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black ">
        <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
          Alfido Tech Internship
        </h2>
        <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
          Login to get started!
        </p>

        <form className="my-8" onSubmit={handleSubmit}>
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
            <LabelInputContainer>
              <Label htmlFor="username">Username</Label>
              <Input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                id="username"
                placeholder="John Doe"
                type="text"
              />
            </LabelInputContainer>
          </div>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="email">Email Address</Label>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              placeholder="projectmayhem@fc.com"
              type="email"
            />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="password">Password</Label>
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              placeholder="••••••••"
              type="password"
            />
          </LabelInputContainer>

          <button
            className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            type="submit"
          >
            {isLoading ? (
              "Loading..."
            ) : (
              <>
                Sign up &rarr;
                <BottomGradient />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
