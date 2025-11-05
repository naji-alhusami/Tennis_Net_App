// import React from "react";
// // import Image from "next/image";


// // import signup from "@/public/Images/signup.jpg";
// // import SignupForm from "@/components/Authentication/SignupForm";
// // import LoginForm from "@/components/Authentication/LoginForm";

// interface AuthenticationProps {
//     params: { authType: string };
// }

// const page: React.FC<AuthenticationProps> = ({ params: { authType } }) => {
//     console.log(authType)
//     return (
//         // <div className="">
//         //   <Image
//         //     src={signup}
//         //     alt="auth-background"
//         //     sizes="100vw"
//         //     objectFit="cover"
//         //     fill
//         //     priority
//         //   />
//         // </div>
//         <div className="h-full relative">
//             <div
//                 className=" h-screen w-full flex flex-col justify-center items-center"
//                 style={{
//                     // backgroundImage: "url('/images/signup.jpg')",
//                     backgroundPosition: "center",
//                     backgroundRepeat: "no-repeat",
//                     // backgroundSize: "26rem",
//                     backgroundSize: "cover",
//                     // filter: "brightness(0.5)",
//                 }}
//             ></div>
//             {/* <div className="w-full absolute top-20 z-10 flex justify-center items-center bg-white bg-opacity-60">
//         {authType === "signup" ? (
//           <SignupForm />
//         ) : authType === "login" ? (
//           <LoginForm
//           // callbackUrl={searchParams.callbackUrl || "/"}
//           />
//         ) : (
//           // <AddExtraInfo />
//           <p>s</p>
//         )}
//       </div> */}
//         </div>
//     );
// };
// {
//     /* <div>
//           {params.authType === "signup" ? (
//             <Signup />
//           ) : params.authType === "signin" ? (
//             <Login callbackUrl={searchParams.callbackUrl || "/"} />
//           ) : (
//             <AddExtraInfo />
//           )}
//         </div> */
// }
// // </div>

// export default page;

// -----------------------------------------------------

// import { notFound } from "next/navigation";

// // If you enabled typed routes, you can also type with PageProps<'/auth/[authType]'>
// export default async function AuthPage({
//   params,
//   searchParams,
// }: {
//   params: Promise<{ authType: string }>;
//   searchParams: Promise<{ callbackUrl?: string }>;
// }) {
//   const { authType } = await params;
//   const { callbackUrl } = await searchParams;

//   if (authType !== "signup" && authType !== "login") notFound();

//   return (
//     <div className="relative min-h-dvh">
//       {/* background image layer */}
//       <div
//         aria-hidden
//         className="absolute inset-0 bg-center bg-cover"
//         style={{ backgroundImage: "url('/images/signup.jpg')" }}
//       />
//       {/* content layer */}
//       <div className="relative z-10 flex min-h-dvh items-center justify-center bg-white/60">
//         {authType === "signup" ? (
//           // <SignupForm />
//           <p>Signup form here</p>
//         ) : (
//           // <LoginForm callbackUrl={callbackUrl ?? "/"} />
//           <p>Login form here (callback: {callbackUrl ?? "/"})</p>
//         )}
//       </div>
//     </div>
//   );
// }


// import Image from "next/image";

// import LoginForm from "@/components/Auth/LoginForm";
// import SignupForm from "@/components/Auth/SignupForm";

// const AuthPage = async ({
//     params,
//     // searchParams,
// }: {
//     params: Promise<{ authType: string }>;
//     // searchParams: Promise<{ callbackUrl?: string }>;
// }) => {
//     const { authType } = await params;
//     // const { callbackUrl } = await searchParams;
//     console.log(authType)
//     // console.log(callbackUrl)

//     return (
//         <div className="relative w-full flex items-center justify-center">
//             <div className="py-30">
//                 <Image
//                     src="/test.png"
//                     alt="auth"
//                     width={500}
//                     height={200}
//                     className="w-[800px] h-auto"
//                     priority
//                 />
//             </div>
//             <div>
//                 {authType === "signup" ? (
//                     <SignupForm />
//                 ) : authType === "login" ? (
//                     <LoginForm
//                     // callbackUrl={searchParams.callbackUrl || "/"}
//                     />
//                 ) : (
//                     // <AddExtraInfo />
//                     <p>s</p>
//                 )}
//             </div>
//         </div>)
// }

// export default AuthPage

import Image from "next/image";
import LoginForm from "@/components/Auth/LoginForm";
import SignupForm from "@/components/Auth/SignupForm";

export default async function AuthPage({
    params,
}: { params: Promise<{ authType: string }> }) {
    const { authType } = await params;

    return (
        <div className="relative py-20">
            {/* background image layer */}
            <div className="absolute inset-0 flex justify-center items-center -z-10">
                <div className="relative w-[600px] max-w-[90vw] md:w-[700px] lg:w-[800px]">
                    <Image
                        src="/test.png"
                        alt="auth background"
                        width={800}
                        height={400}
                        className="w-full h-auto object-contain opacity-90 select-none pointer-events-none"
                        priority
                    />
                </div>
            </div>

            {/* overlay content layer */}
            <div className="relative z-10 grid  place-items-center p-4">
                {authType === "signup" ? <SignupForm /> : <LoginForm />}
            </div>
        </div>
    );
}
