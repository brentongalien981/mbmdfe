export const onOrderInputChange = (container, e) => {

    const targetName = e.target.name;
    const targetVal = e.target.value;

    let updatedOrder = container.state.order;
    updatedOrder[targetName] = targetVal;

    container.setState({ order: updatedOrder });

};