import { Remove, Add, Delete } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Box, Typography, Grid, Button } from "@mui/material";
import { removeBasketItemAsync, addBasketItemAsync } from "./BasketSlice";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { BasketItem } from "../../app/models/basket";
import { OrderItem } from "../../app/models/order";

interface Props {
    items: BasketItem[] | OrderItem[] | null;
    isBasket?: boolean
    id?: number
    orderStatus?: string
    handleBack?: any
}

export default function BasketTable({ items, isBasket = true, orderStatus, id, handleBack }: Props) {
    const dispatch = useAppDispatch()
    const { status } = useAppSelector((state) => state.basket)

    if (!items) return <Typography variant='h3'>Something wrong</Typography>

    return (
        <>
            {!isBasket &&
                <Grid container>
                    <Grid item xs={6} >
                        <Typography variant='h4' sx={{ p: 2 }}>Order# {id} - {orderStatus}</Typography>
                    </Grid>
                    <Grid item xs={6}
                        container
                        justifyContent="flex-end"
                        alignItems="baseline"
                    >
                        <Button
                            variant='contained'
                            size='large'
                            fullWidth
                            onClick={handleBack}
                            sx={{ mt: 2, mr: 2, width: 200 }}
                        >
                            BACK TO ORDERS
                        </Button>
                    </Grid>
                </Grid>
            }
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Product</TableCell>
                            <TableCell align='right'>Price</TableCell>
                            <TableCell align='center'>Quantity</TableCell>
                            <TableCell align='right'>Subtotal</TableCell>
                            {isBasket &&
                                <TableCell align='right'></TableCell>}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {items.map((item) => (
                            <TableRow
                                key={item.productId}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component='th' scope='row'>
                                    <Box display='flex' alignItems='center'>
                                        <img
                                            src={item.pictureUrl}
                                            alt={item.name}
                                            style={{ height: 50, marginRight: 20 }}
                                        />
                                        <span>{item.name}</span>
                                    </Box>
                                </TableCell>
                                <TableCell align='right'>
                                    ${(item.price / 100).toFixed(2)}
                                </TableCell>
                                <TableCell align='center'>
                                    {isBasket &&
                                        <LoadingButton
                                            loading={status.includes(
                                                'pendingRemoveItem' + item.productId + 'rem'
                                            )}
                                            onClick={() =>
                                                dispatch(
                                                    removeBasketItemAsync({
                                                        productId: item.productId,
                                                        quantity: 1,
                                                        name: 'rem',
                                                    })
                                                )
                                            }
                                            color='error'
                                        >
                                            <Remove />
                                        </LoadingButton>}
                                    {item.quantity}
                                    {isBasket &&
                                        <LoadingButton
                                            loading={status === 'pendingAddItem' + item.productId}
                                            onClick={() =>
                                                dispatch(
                                                    addBasketItemAsync({ productId: item.productId })
                                                )
                                            }
                                            color='secondary'
                                        >
                                            <Add />
                                        </LoadingButton>}
                                </TableCell>
                                <TableCell align='right'>
                                    {((item.price / 100) * item.quantity).toFixed(2)}
                                </TableCell>
                                {isBasket &&
                                    <TableCell align='right'>
                                        <LoadingButton
                                            loading={status.includes(
                                                'pendingRemoveItem' + item.productId + 'del'
                                            )}
                                            onClick={() =>
                                                dispatch(
                                                    removeBasketItemAsync({
                                                        productId: item.productId,
                                                        quantity: item.quantity,
                                                        name: 'del',
                                                    })
                                                )
                                            }
                                            color='error'
                                        >
                                            <Delete />
                                        </LoadingButton>
                                    </TableCell>}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}