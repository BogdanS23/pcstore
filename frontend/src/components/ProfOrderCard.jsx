import React from "react";

export const ProfOrderCard = ({ orders, isMyPcs }) => {
    if (orders.length === 0) {
        return <div className="profOrderCard" style={{fontFamily:"silkscreen", fontSize: "20px"}}>Тут пока пусто...</div>;
    }
    return (
        <div className="profOrderCard" style={{maxHeight:"750px", overflowY: "auto"}}>
            {orders.map(order => {
                const filteredPcList = order.pcList.filter(pc => !isMyPcs || pc.pcType === "USER");
                if (isMyPcs && filteredPcList.length === 0) {
                    return null; // Не отображать заказы без пользовательских сборок
                }

                return (
                    <div className="order-card" style={{maxHeight:"500px", overflowY: "auto"}} key={order.id}>
                        {!isMyPcs && <div className="order-title">Заказ #{order.id}</div>}
                        <div className="order-container">
                            {filteredPcList.map((pc, index) => {
                                const totalCost = Object.keys(pc)
                                    .filter(key => pc[key] && pc[key].price)
                                    .map(key => pc[key].price)
                                    .reduce((sum, price) => sum + price, 0);

                                return (
                                    <div key={index} className="pc-order-card">
                                        <div style={{fontFamily: 'silkscreen', fontSize:"28px"}}>{isMyPcs ? `Сборка #${pc.id}` : pc.pcType==="IND_COMP" ? `Комплектующие #${pc.id}`: `PC #${pc.id}`}</div>
                                        {pc.pccase && <div className="specs"><span style={{fontWeight:"bold"}}>Корпус: </span>{pc.pccase.manufacturer + " " + pc.pccase.model}</div>}
                                        {pc.cooler && <div className="specs"><span style={{fontWeight:"bold"}}>Охлаждение: </span>{pc.cooler.manufacturer + " " + pc.cooler.model}</div>}
                                        {pc.graphicsCard && <div className="specs"><span style={{fontWeight:"bold"}}>Видеокарта: </span>{pc.graphicsCard.manufacturer + " " + pc.graphicsCard.model}</div>}
                                        {pc.motherboard && <div className="specs"><span style={{fontWeight:"bold"}}>Материнская плата: </span>{pc.motherboard.manufacturer + " " + pc.motherboard.model}</div>}
                                        {pc.powerSupply && <div className="specs"><span style={{fontWeight:"bold"}}>Блок питания: </span>{pc.powerSupply.manufacturer + " " + pc.powerSupply.model}</div>}
                                        {pc.processor && <div className="specs"><span style={{fontWeight:"bold"}}>Процессор: </span>{pc.processor.manufacturer + " " + pc.processor.model}</div>}
                                        {pc.ram && <div className="specs"><span style={{fontWeight:"bold"}}>ОЗУ: </span>{pc.ram.manufacturer + " " + pc.ram.model}</div>}
                                        {pc.storageDevice && <div className="specs"><span style={{fontWeight:"bold"}}>Накопитель: </span>{pc.storageDevice.manufacturer + " " + pc.storageDevice.model}</div>}
                                        <div style={{margin: "4px", minHeight: "2px", background: "black", width: "95%"}}></div>
                                        <div className="specs">Общая стоимость: {totalCost}</div>
                                        {isMyPcs && <div className="specs">Рейтинг сборки: {pc.rating}</div>}
                                    </div>
                                );
                            })}
                        </div>
                        {!isMyPcs && (
                            <>
                                <div className="specs">Общая стоимость заказа: {filteredPcList.reduce((totalSum, pc) => (
                                    totalSum + Object.keys(pc)
                                        .filter(key => pc[key] && pc[key].price)
                                        .map(key => pc[key].price)
                                        .reduce((sum, price) => sum + price, 0)
                                ), 0)}</div>
                                <div className="specs">Статус заказа: {order.status}</div>
                            </>
                        )}
                    </div>
                );
            })}
        </div>
    );
};
