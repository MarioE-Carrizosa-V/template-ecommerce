import startLogin from "./startLogin"

export default async function loginPassword(){
  const start = await startLogin('ernesto@vinneren.com.mx')
  console.log(start)
  //const response = fetch()
  return start
}
