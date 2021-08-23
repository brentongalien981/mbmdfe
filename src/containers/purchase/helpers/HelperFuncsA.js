export const readPurchase = (container) => {

    if (container.state.isReadingPurchase) { return; }

    container.setState({ isReadingPurchase: true });


    const data = {
        params: {
            purchaseId: container.props.match.params.id
        },
        doCallBackFunc: (objs) => {

            container.setState({
                isReadingPurchase: false,
                purchase: objs.purchase,
                purchaseItems: objs.purchaseItems
            });
        }
    };

    container.props.readPurchase(data);

};