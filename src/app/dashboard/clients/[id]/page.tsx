// export default async function Page({
//     params,
//   }: {
//     params: Promise<{ slug: string }>
//   }) {
//     const slug = (await params).slug
//     return <div>My Post: {slug}</div>
//   }

  import { FC } from 'react';
  
  interface pageProps {
    params: Promise<{id: string}>
  };
  
  const page: FC<pageProps> = async ({params}) => {
    const id = (await params).id
    return <div> Page of {id} </div>;
  };
  
  export default page;