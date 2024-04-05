/* eslint-disable @next/next/no-img-element */
import { Row, Col, Button, Card } from "antd";
import Link from "next/link";

interface GiftCardsSectionProps {
  tarjetasDeRegalo: any[]; 
}

const GiftCardsSection: React.FC<GiftCardsSectionProps> = ({
  tarjetasDeRegalo,
}) => (
    <Card className="dark:bg-gray-400 text-white my-2">
    <h2 className="text-2xl font-semibold mb-6 text-center">Gift Cards</h2>
    <div className="flex flex-col justify-center items-center">
      <Row
        gutter={[8, 8]}
        className="sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 2xl:grid-cols-4 "
      >
        {tarjetasDeRegalo.map((game, index) => (
          <Col className="mx-2 sm:mx-4 md:mx-2 lg:mx-4 " key={index}>
            <div className="card-home card2 border border-gray-300 shadow-md rounded-xl dark:bg-gray-900 dark:w-24 dark:h-24 ">
              <Link href={`/cards-details/${game.id}`}>
                <div className="border border-gray-300 shadow-md rounded-xl dark:bg-gray-900 dark:w-24 dark:h-24 hover:shadow-lg transition duration-300">
                  <img
                    alt={game.nombre}
                    src={game.imagen}
                    className="w-24 h-24 dark:w-24 dark:h-24 object-contain rounded-xl"
                  />
                </div>
              </Link>
            </div>
          </Col>
        ))}
      </Row>

      <Button
        type="primary"
        block
        size="large"
        className="mt-6 button1 dark:w-full"
        onClick={() => (window.location.href = "/gift-cards")}
      >
        Read More
      </Button>
    </div>
  </Card>
);

export default GiftCardsSection;
