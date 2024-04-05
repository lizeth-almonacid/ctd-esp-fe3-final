/* eslint-disable @next/next/no-img-element */
import { Row, Col, Button, Card } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface RecommendationsSectionProps {
  recomendaciones: any[];
}

const RecommendationsSection: React.FC<RecommendationsSectionProps> = ({
  recomendaciones,
}) => {
  const router = useRouter();
  const juegosOrdenados = [...recomendaciones].sort((b, a) => {
    const dateA: any = new Date(a.release_date);
    const dateB: any = new Date(b.release_date);
    return dateB - dateA ;
  });

  function formatDate(dateString: any) {
    const options: any = { day: "numeric", month: "short", year: "numeric" };
    const formattedDate = new Date(dateString).toLocaleDateString(undefined, options);
    return formattedDate;
  }
  return (
    <Card className='dark:bg-gray-400 text-white my-2'>
    <h2 className='text-center text-2xl font-semibold mb-6'>
      Recommendations games
    </h2>
    <div className='flex flex-col justify-center items-center'>
      <Row
        gutter={[16, 16]}
        className='md:grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-4'
      >
        {juegosOrdenados.map((game: any, index) => (
          <Col className='w-full sm:mx-2 md:mx-2 lg:mx-2 2xl:mx-2' key={index}>
            <div className='card-home card2 border border-gray-300 shadow-md rounded-xl dark:bg-gray-900 h-96'>
              <Link href={`/game-details/${game.id}`}>
                <img
                  alt={game.nombre ? game.nombre : game.name}
                  src={game?.imagen ? game?.imagen : game?.image_url || 'https://pixel-palace.netlify.app/logo.png'}
                  className='bg-gray-900 w-full h-48 object-cover rounded-t-xl border border-gray-300'
                />
                <div className='p-4'>
                  <h2 className='text-xl font-semibold mb-2'>{game.nombre ? game.nombre : game.name}</h2>
                  <p className='text-gray-100'>
                  {game?.categoria
                    ? game?.categoria
                        .split(",")
                        .map((category: any) => category.trim())
                        .join(", ")
                    : game?.categories.join(", ")}
                    </p>
                  <p className='text-gray-100'>{game.release_date && formatDate(game.release_date)}</p>
                  <p className='text-red-500 font-semibold mt-2'>
                    ${game.precio ? game.precio : game.price }
                  </p>
                </div>
              </Link>
            </div>
          </Col>
        ))}
      </Row>

      <Button
        type='primary'
        block
        size='large'
        className='mt-6 button1 dark:w-full'
        onClick={() => (router.push('/recommendations'))}
      >
        Read More
      </Button>
    </div>
  </Card>
  );
};
export default RecommendationsSection;
