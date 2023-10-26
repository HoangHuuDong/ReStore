import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Button, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import agent from "../../app/api/agent";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { Order, OrderItem } from "../../app/models/order";
import { currencyFormat } from "../../app/util/util";
import BasketTable from "../basket/BasketTable";
import BasketSummary from "../basket/BasketSummary";

export default function Orders() {
    const [orders, setOrders] = useState<Order[] | null>(null)
    const [loading, setLoading] = useState(true)
    const [isShowDetail, setShowDetail] = useState(false)
    const [orderDetail, setOrderDetail] = useState<OrderItem[] | null>(null)
    const [orderId, setOrderId] = useState<number>()
    const [orderStatus, setOrderStatus] = useState<string>()

    useEffect(() => {
        setLoading(true)
        agent.Orders.list()
            .then(orders => setOrders(orders))
            .catch(error => console.log(error))
            .finally(() => setLoading(false))
    }, [])

    if (loading) return <LoadingComponent message="Loading orders..." />

    const handleShowDetail = (order: any) => {
        setOrderDetail(order.orderItems)
        setOrderId(order.id)
        setOrderStatus(order.orderStatus)
        setShowDetail(true)
    }

    const handleBack = () => {
        setShowDetail(false)
    }

    return (
        <>
            {!isShowDetail && <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Order number</TableCell>
                            <TableCell align="right">Total</TableCell>
                            <TableCell align="right">Order Date</TableCell>
                            <TableCell align="right">Order Status</TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders?.map((order) => (
                            <TableRow
                                key={order.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {order.id}
                                </TableCell>
                                <TableCell align="right">{currencyFormat(order.total)}</TableCell>
                                <TableCell align="right">{order.orderDate.split('T')[0]}</TableCell>
                                <TableCell align="right">{order.orderStatus}</TableCell>
                                <TableCell align="right">
                                    <Button onClick={() => handleShowDetail(order)}>View</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>}
            {isShowDetail &&
                <>
                    <BasketTable items={orderDetail} isBasket={false} id={orderId} orderStatus={orderStatus} handleBack={handleBack} />
                    <Grid container>
                        <Grid item xs={6} />
                        <Grid item xs={6}>
                            <BasketSummary items={orderDetail} />
                        </Grid>
                    </Grid>
                </>
            }
        </>
    )
}