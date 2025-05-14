import { createEvent } from 'effector';

const userLoggedIn = createEvent<{ name: string; age: number }>();

// ma’lumotni konsolga chiqaramiz
userLoggedIn.watch(user => {
   console.log('Foydalanuvchi tizimga kirdi:', user);
});

export function HomePage() {
   userLoggedIn({ name: 'Zarina', age: 30 });
   return (
      <div>
         <h1 className='text-3xl font-bold underline'>Hello world!</h1>
         <p className='text-lg'>Welcome to the Home Page</p>
      </div>
   );
}
