"use client"
import Link from "next/link"
import { useEffect, useState } from "react"
import { TbDoorEnter } from "react-icons/tb"
import { signIn, signOut, useSession, getProviders } from "next-auth/react"


export default function Header() {
    const { data: session } = useSession()

    const [providers, setProviders] = useState(null)
    //    useEffect(() => {
    //        if (window.location.pathname === "/sign-in") {
    //            document.title = "Sign In"
    //        } else if (window.location.pathname === "/register") {
    //            document.title = "Register"
    //        } else {
    //            document.title = "CRUD App"
    //        }
    //    }, [window.location.pathname])
    useEffect(() => {
        (async () => {
          const res = await getProviders();
          setProviders(res);
        })();
      }, [])

    return (
        <nav className="bg-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <Link href="/">
                                <p className="text-white font-bold text-2xl">CRUD App</p>
                            </Link>
                        </div>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-4 flex items-center md:ml-6">
                            {session?.user ? (
                                <>
                                    <Link href='/create-prompt' className='black_btn'>
                                        Create Post
                                    </Link>

                                    <button type='button' onClick={signOut} className='outline_btn'>
                                        Sign Out
                                    </button>
                                    <Link href='/profile'>
                                        <Image
                                            src={session?.user.image}
                                            width={37}
                                            height={37}
                                            className='rounded-full'
                                            alt='profile'
                                        />
                                    </Link>
                                </>
                            ) : (
                                <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type='button'
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id);
                  }}
                  className='px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-gray-700'
                >
                  Sign in
                </button>
              ))}
          </>
                            )}
                            {/*<Link href={window.location.pathname === "/sign-in" ? "/register" : window.location.pathname === "/register" ? "/sign-in" : ""} className="px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-gray-700"><div className="flex items-center space-x-3"><TbDoorEnter />{window.location.pathname === "/sign-in" ? "Register" : window.location.pathname === "/register" ? "Sign In" : ""}</div></Link>*/}
                        </div>
                    </div>
                </div>
            </div>
        </nav>

    )
}
