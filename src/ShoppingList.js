import React from 'react';
class ShoppingList extends React.Component {
    render() {
        return (
            <div class="container">
                <h1>Shopping List for {this.props.name}</h1>
                <ul class="list-group">
                    <li class="list-group-item">Instagram</li>
                    <li class="list-group-item">WhatsApp</li>
                    <li class="list-group-item">Oculus</li>
                </ul>
            </div>
        );
    }
}

export default ShoppingList;