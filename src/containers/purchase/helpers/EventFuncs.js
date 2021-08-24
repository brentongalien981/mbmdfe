export const onPurchaseInputChange = (container, e) => {

    const targetName = e.target.name;
    const targetVal = e.target.value;

    let updatedPurchase = container.state.purchase;
    updatedPurchase[targetName] = targetVal;

    container.setState({ purchase: updatedPurchase });

};