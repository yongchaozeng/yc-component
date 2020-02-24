import React, { } from 'react';
import PropTypes from 'prop-types';
import './index.scss';

function Picture(props) {
    let { active, src, shadow, index,idx,item} = props;
    return (
        <div className='vote-border'>

            <img className={`img-${index}-${idx} role`} src={src}   alt="" />

            {
                shadow&& !active && <img  className={`shade-img index-${index}-${idx}`} data-pricture={`${item.card_name}-${item.card_group}`} data-index={`index-${index}-${idx}`} src={require('../../../assets/imgs/shadow-border.png')} alt="" />
            }
            {/* <img className='shade-img' src={require('../../../assets/imgs/card-border.png')} alt=""/> */}
            {
                active && <img className='pitch-on'
                    src={require('../../../assets/imgs/pitch-on.png')}
                    alt="" />
            }
        </div>

    );
}


Picture.propTypes = {
    shadow: PropTypes.bool
};
Picture.defaultProps  = {
    shadow: true
};

export default Picture