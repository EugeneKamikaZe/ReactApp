import s from './style.module.css';
import cn from 'classnames'

const Loader = ({loader}) => {
    return <div className={cn(s.pokeball, {[s.disable]: !loader})}><span></span></div>;
};

export default Loader;
