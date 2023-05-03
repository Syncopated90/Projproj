import CircleLoader from '../views/circleLoader';

export default function CircleLoaderPresenter(waterLevel){
  return <CircleLoader level={parseInt(waterLevel)}/>
}