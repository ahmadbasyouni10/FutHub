import Card from "./Card"
import { TiHomeOutline } from "react-icons/ti";
import { LiaUserFriendsSolid } from "react-icons/lia";
import { BiRepost } from "react-icons/bi";
import { IoMdNotificationsOutline } from "react-icons/io";
import { CiLogout } from "react-icons/ci";
import { useRouter } from "next/router";
import { CgProfile } from "react-icons/cg";
import Link from "next/link";
import { supabase } from "../client";
import ThemeToggle from "./ThemeToggle";
import { useEffect, useState } from "react";
import { CiHeart } from "react-icons/ci";



const Sidebar = () => {
    const router = useRouter();
    const [session, setSession] = useState(null);
    const activeItemStyles = 'text-white dark:text-black bg-teal-500 hover:bg-teal-200'
    const {asPath:currentPath} = router;
    const handleLogOut = async () => {
        const {error} = await supabase.auth.signOut();
        if(error) console.log(error);
        else router.push('/login');
    }

    useEffect(() => {
        const fetchSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            setSession(session);
            if (!session) {
                router.push('/login');
                return
              }
        };
        fetchSession();
    }, [router, supabase, setSession]);


    return(
        <div>
            <Card Padding={true} className="">
            <h2 className=" text-gray-400 text-2xl font-bold mb-3 pt-2">Futhub</h2>
            <Link href="/" className={`${currentPath === '/' ? activeItemStyles : 'hover:bg-teal-200'} hover:scale-110 hover:bg-opacity-50 text-lg hover:shadow-md flex items-center h-10 gap-2 py-5 -mx-4 px-4 rounded-md transition-all`}><TiHomeOutline className="text-2xl" />Home</Link>
            <Link href={"/profile/" + session?.user.id + '/posts'} className={`${currentPath === '/profile' || currentPath === '/profile/about' || currentPath === '/profile/posts' ? activeItemStyles : 'hover:bg-teal-200'} hover:scale-110 hover:bg-opacity-50 hover:shadow-md flex items-center text-lg h-10 gap-2 py-5 -mx-4 px-4 rounded-md transition-all`}><CgProfile className="text-2xl" />Profile</Link>
            <Link href={"/favorites/"} className={`${currentPath === '/favorites' ? activeItemStyles : 'hover:bg-teal-200'} hover:scale-110 hover:bg-opacity-50 hover:shadow-md flex text-lg items-center h-10 gap-2 py-5 -mx-4 px-4 rounded-md transition-all`}><CiHeart className="text-2xl" />Favorites</Link>
            <Link href="/notifications" className={`${currentPath === '/notifications' ? activeItemStyles : 'hover:bg-teal-200'} hover:scale-110 text-lg hover:bg-opacity-50 hover:shadow-md flex items-center h-10 gap-2 py-5 -mx-4 px-4 rounded-md transition-all`}><IoMdNotificationsOutline className="text-2xl" />Notifications</Link>
            
            <button className="w-full" onClick={handleLogOut}>
            <span className="hover:bg-teal-200 text-lg hover:scale-110 hover:bg-opacity-50 hover:shadow-md flex items-center h-10 gap-2 py-5 -mx-4 px-4 rounded-md transition-all mt-16">
                <CiLogout className="text-2xl" />
                <span className="hidden md:block">Logout</span>
            </span>
            </button>
        </Card>
        <div className="absolute top-3 right-10"><ThemeToggle /></div>
    </div>
    );
}

export default Sidebar
