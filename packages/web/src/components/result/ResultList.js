import React, { Component } from 'react';
import { oneOfType } from 'prop-types';
import types from '@appbaseio/reactivecore/lib/utils/types';
import Title from '../../styles/Title';
import ListItem from '../../styles/ListItem';
import ResultListImage from './addons/ResultListImage';

class ResultList extends Component {
	static Image = ResultListImage;
	static Content = ({ children, ...props }) => <article {...props}>{children}</article>;
	static Title = ({ children, ...props }) => <Title {...props}>{children}</Title>;
	static Description = ({ children, ...props }) => <div {...props}>{children}</div>;

	state = {
		hasImage: false,
		isSmall: false,
	};

	componentDidMount() {
		let hasImage = false;
		let isSmall = false;
		const { children } = this.props;
		const ImageChild = React.Children.toArray(children).find(
			o => o.type && o.type.name === ResultListImage.name,
		);
		if (ImageChild) {
			hasImage = true;
			if (ImageChild.props.small) {
				isSmall = true;
			}
		}

		// eslint-disable-next-line
		this.setState({
			hasImage,
			isSmall,
		});
	}

	render() {
		const {
			children, id, href, target, as, ...props
		} = this.props;
		const { hasImage, isSmall } = this.state;
		return (
			<ListItem
				id={id}
				as={as}
				href={href}
				image={hasImage}
				small={isSmall}
				target={target}
				rel={target === '_blank' ? 'noopener noreferrer' : null}
				{...props}
			>
				{children}
			</ListItem>
		);
	}
}

ResultList.propTypes = {
	children: types.children,
	target: types.stringRequired,
	href: types.string,
	as: types.string,
	id: oneOfType([types.string, types.number]),
};

ResultList.defaultProps = {
	target: '_blank',
	as: 'a',
};

export default ResultList;
