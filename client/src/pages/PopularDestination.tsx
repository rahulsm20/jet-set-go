import DestinationCard from '../components/DestinationCard'
import Navbar from '../components/Navbar'

const PopularDestination = () => {
  return (
    <div>
        <Navbar/>
        <div className='flex flex-col justify-center items-center'>
        <DestinationCard/>
        </div>
    </div>
  )
}

export default PopularDestination