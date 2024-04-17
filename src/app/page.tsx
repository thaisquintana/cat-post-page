async function getCats() {
  const response = await fetch("http://localhost:3000/api/instacat?postId=1")
  return await response.json();
}
export default async function Home() {
  const data = await getCats();

  const renderList = data.comments.map((comment: any) => 
    (
      <li key={comment.id} className="text-base">
        <h4 className="text-gray-700 my-4 uppercase font-semibold">{comment.name}</h4>
        <p className="mb-8 capitalize">{comment.body}</p>
      </li>
    )
)

return(
  <div>
    <main>
      <section className="flex">
        <div className="w-6/12">
          <img src={data?.imgUrl} alt="post" /> 
        </div>
        <div className="w-6/12 mx-4">
          <div className="mb-10">
            <h3 className="text-xl uppercase leading-8 mt-8 font-semibold text-gray-700">{data?.post}</h3>
          </div>
          <div>
            <ul>
              {renderList}
            </ul>
          </div>
        </div>
      </section>
    </main>

    </div>
)
}
