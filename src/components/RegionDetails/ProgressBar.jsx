import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { css } from 'styled-components';

import { Box, Flex } from '../Grid';
import styled, { theme, themeGet } from '../../../util/style';

const Wrapper = styled(Box).attrs({ mx: [0, 0, '1rem'], my: '1rem' })``

const ItemContainer = styled(Flex)`
  margin: 0 0.5em;
`

const Labels = styled(Flex)`
  margin-top: 0.25em;
  font-size: 0.7em;
  color: ${themeGet('colors.grey.700')};
`

const ProgressBar = styled.div`
    background: linear-gradient(to right, rgb(253,231,37), rgb(180,222,44), rgb(109,205,89), rgb(53,183,121), rgb(31,158,137), rgb(38,130,142), rgb(49,104,142), rgb(62,74,137), rgb(72,40,120), rgb(68,1,84));
    border: 0.5px solid #808080;
    border-radius: 0px;
	position: relative;
	height: 10px;
    width: 400px;
`

const ProgressDone = styled.div`
    background: linear-gradient(to left, rgba(255, 0, 0, 0.0), rgba(255, 0, 0, 0.0));
    border-radius: 20px;
    color: #fff;
    display: absolute;
    text-align: end;
    height: 100%;
    width: 0;
    opacity: 1;
    transition: 1s ease 0.3s;
    &:after {
        position: absolute;
	    content: '';
	    height: 18px;
  	    width: 18px;
  	    background-color: #fff;
        border-radius: 50%;
        border: 1px solid #000;
        opacity: 1;
        top: -5px;    
    }
`

const Progress = ({ done }) => {
	const [style, setStyle] = React.useState({});
	
	setTimeout(() => {
		const newStyle = {
			width: `${done}%`
		}
		
		setStyle(newStyle);
	}, 200);
	
	return (
    <Wrapper>
        <ItemContainer alignItems="center">
            <ProgressBar>
            <ProgressDone style={style}></ProgressDone>
            </ProgressBar>
        </ItemContainer>
        <Labels justifyContent="space-between" alignItems="center">
            <div>lowest</div>
            <div>highest</div>
        </Labels>
    </Wrapper>
	)
}

Progress.propTypes = {
    done: PropTypes.number.isRequired,
  }
  
export default Progress