export function NotFoundPage() {
   return (
      <div>
         <h1 className='text-3xl font-bold underline'>404 Not Found</h1>
         <p className='text-lg'>The page you are looking for does not exist.</p>
         <a href='/' className='text-blue-500 hover:underline'>
            Go back to Home
         </a>
         <p className='text-lg'>
            If you need assistance, please contact support.
         </p>
         <p className='text-lg'>
            You can also check our{' '}
            <a href='/help' className='text-blue-500 hover:underline'>
               Help Center
            </a>{' '}
            for more information.
         </p>
      </div>
   );
}
