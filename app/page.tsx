"use client";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { title as textTitle } from "@/components/shared/Primitives";
import { Button, buttonVariants } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const session = useSession();
  const router = useRouter();
  const handleSignOut = () => {
    signOut();
    router.push("/");
  };

  const { data: dataSession } = useSession();
  return (
    <>
      <MaxWidthWrapper className="mb-12 mt-20 sm:mt-15 flex flex-col items-center justify-center text-center">
        {session.status === "unauthenticated" ? (
          <>
            <div className="mx-auto mb-4 flex max-w-fit items-center justify-center space-x-2 overflow-hidden rounded-full border border-gray-200 bg-white px-7 py-2 shadow-md backdrop-blur transition-all hover:border-gray-300 hover:bg-white/80">
              <p className="text-sm font-semibold text-gray-700">
                .nextEvery agora em produção!
              </p>
            </div>
            <h1
              className={`max-w-4xl text-5xl font-bold md:text-6xl lg:text-7xl ${textTitle(
                { size: "lg" }
              )}`}
            >
              Crie{" "}
              <span className={textTitle({ color: "violet", size: "lg" })}>
                publicações
              </span>{" "}
              de uma maneira intuitiva em questão de segundos.
            </h1>
            <p className="mt-5 max-w-prose text-zinc-500 sm:text-lg">
              NextEvery utiliza as últimas tecnologias para proporcionar uma
              experiência agradável. Sendo algumas delas, 'nextAuth, Tailwind,
              shadcnUI, NextUI, Sooner, Prisma, MongoDB, Zod, React Hook Form e
              TanStack Query'.
            </p>
            <Link
              className={`bg-gradient-to-r from-purple-800 via-purple-600 to-purple-800 ${buttonVariants(
                {
                  size: "lg",
                  className: "mt-5",
                }
              )}`}
              href="/login"
            >
              Comece agora <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            {/* Background */}
            <div>
              <div className="relative isolate">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
                >
                  <div
                    style={{
                      clipPath:
                        "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                    }}
                    className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                  />
                </div>

                <div>
                  <div className="mx-auto max-w-6xl px-6 lg:px-8">
                    <div className="mt-16 flow-root sm:mt-24">
                      <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
                        <Image
                          src="/landingpage-dashboard.png"
                          alt="product preview"
                          width={1364}
                          height={866}
                          quality={100}
                          className="rounded-md bg-white p-2 sm:p-8 md:p-[0.7px] shadow-2xl ring-1 ring-gray-900/10"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
                >
                  <div
                    style={{
                      clipPath:
                        "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                    }}
                    className="relative left-[calc(50%-13rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-36rem)] sm:w-[72.1875rem]"
                  />
                </div>
              </div>
            </div>

            {/* Seção de passo a passo */}
            <div className="mx-auto mb-32 mt-32 max-w-5xl sm:mt-56">
              <div className="mb-12 px-6 lg:px-8">
                <div className="mx-auto max-w-2xl sm:text-center">
                  <h2
                    className={`text-4xl sm:text-5xl max-w-4xl font-bold md:text-6xl lg:text-7xl ${textTitle(
                      { size: "sm" }
                    )}`}
                  >
                    Comece a criação dos posts em{" "}
                    <span
                      className={textTitle({ color: "violet", size: "sm" })}
                    >
                      poucos passos.
                    </span>
                  </h2>
                  <p className="mt-4 text-lg text-zinc-500">
                    Nunca foi tão fácil a criação de publicações.
                  </p>
                </div>
              </div>

              {/* steps */}
              <ol className="my-8 space-y-4 pt-8 md:flex md:space-x-12 md:space-y-0">
                <li className="md:flex-1">
                  <div className="flex flex-col space-y-2 border-l-4 border-zinc-300 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4">
                    <span className={textTitle({ color: "violet" })}>
                      1° Passo
                    </span>
                    <span className="text-xl font-semibold">
                      Crie uma conta.
                    </span>
                    <span className="mt-2 text-zinc-500">
                      Entre utilizando uma conta existente ou{" "}
                      <Link
                        href="/register"
                        className="text-white underline underline-offset-2"
                      >
                        crie uma
                      </Link>
                      .
                    </span>
                  </div>
                </li>
                <li className="md:flex-1">
                  <div className="flex flex-col space-y-2 border-l-4 border-zinc-300 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4">
                    <span className={textTitle({ color: "violet" })}>
                      2° Passo
                    </span>
                    <span className="text-xl font-semibold">
                      Crie uma publicação
                    </span>
                    <span className="mt-2 text-zinc-500">
                      Basta entrar na página de criação e inserir as
                      informações.
                    </span>
                  </div>
                </li>
                <li className="md:flex-1">
                  <div className="flex flex-col space-y-2 border-l-4 border-zinc-300 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4">
                    <span className={textTitle({ color: "violet" })}>
                      3° Passo
                    </span>
                    <span className="text-xl font-semibold">
                      Não tem 3° passo
                    </span>
                    <span className="mt-2 text-zinc-500">
                      Crie quantos posts quiser.
                    </span>
                  </div>
                </li>
              </ol>
              <Link
                className={`bg-gradient-to-r from-purple-800 via-purple-600 to-purple-800 ${buttonVariants(
                  {
                    size: "lg",
                    className: "mt-5",
                  }
                )}`}
                href="/login"
              >
                Comece agora <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </>
        ) : (
          <div>
            <div className="text-4xl font-bold text-center justify-center flex flex-col items-center gap-3">
              <p className={textTitle({ color: "violet", size: "lg" })}>
                Seja bem vindo!
              </p>
              <pre>{dataSession?.user?.name}</pre>
              {dataSession?.user?.image === null ? (
                ""
              ) : (
                <Image
                  className="rounded-full"
                  src={dataSession?.user?.image || ""}
                  height={100}
                  width={100}
                  alt={`${dataSession?.user?.name} profile pic`}
                />
              )}
              <Button
                className="mt-10 hover:bg-slate-800"
                variant="outline"
                onClick={handleSignOut}
              >
                Sair
              </Button>
            </div>
          </div>
        )}
      </MaxWidthWrapper>
    </>
  );
};

export default Dashboard;
