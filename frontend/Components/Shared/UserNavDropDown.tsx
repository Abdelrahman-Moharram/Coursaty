import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import Link from 'next/link'
import { setLogout } from '@/redux/features/authSlice';
import { useAppDispatch } from '@/redux/hooks';
import { useLogoutMutation } from '@/redux/features/authApiSlice';
import Cookies from 'js-cookie';
interface user {
    first_name:string;
    last_name: string;
    email:string;
    image:string | undefined;
    id:number
}

interface Props{
    user:user
}
const UserNavDropDown = ({user}:Props) => {
    const dispatch = useAppDispatch();
    const [logout] = useLogoutMutation();

    const handleLogout = () => {
      Cookies.remove('access_token')
		logout(undefined)
			.unwrap()
			.then(() => {
				dispatch(setLogout());
			});
	};
    function classNames(...classes:string[]) {
        return classes.filter(Boolean).join(' ')
        }
    return (
        <Menu as="div" className="relative inline-block text-left">
          <div>
              <Menu.Button className=" items-center inline-flex w-full justify-center gap-x-2 rounded-full px-3 py-2 text-sm font-semibold transition text-black bg-gray-100 hover:bg-gray-200">
              {user?.first_name}
              
              {
                user?.image?
                    <img
                        className="h-8 w-8 rounded-full"
                        src={process.env.NEXT_PUBLIC_HOST+user?.image}
                        alt=""
                    />
                :
                <img
                    className="h-8 w-8 rounded-full"
                    src={'/next.svg'}
                    alt=""
                />
              }

              
              </Menu.Button>
          </div>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      href={`/auth/profile/${user.id}`}
                      className={classNames(
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'block px-4 py-2 text-sm'
                      )}
                    >
                      Profile
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      href="/auth/settings"
                      className={classNames(
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'block px-4 py-2 text-sm'
                      )}
                    >
                      Settings
                    </Link>
                  )}
                </Menu.Item>
              </div>


              <div className="py-1">
                <Menu.Item>
                  {({ active }) => (
                    <button
                        onClick={handleLogout}
                        className={classNames(
                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                            'block px-4 py-2 text-sm cursor-pointer w-full text-left'
                      )}
                    >
                      Logout
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
    )
}

export default UserNavDropDown
