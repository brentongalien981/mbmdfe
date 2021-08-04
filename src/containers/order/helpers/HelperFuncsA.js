export const readOrder = (container) => {

    if (container.state.isReadingOrder) { return; }

    container.setState({ isReadingOrder: true });


    const data = {
        params: {
            orderId: container.props.match.params.id
        },
        doCallBackFunc: () => {
            container.setState({ isReadingOrder: false });
        }
    };

    container.props.readOrder(data);

};