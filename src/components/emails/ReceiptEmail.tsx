import { formatPrice } from '../../lib/utils'
import { Product, ProductFile } from '../../payload-types'

import {
  Body,
  Container,
  Column,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
  render,
} from '@react-email/components'



import * as React from 'react'

import { format } from 'date-fns'
import { main, container, tableCell, heading, informationTable, informationTableRow, informationTableColumn, informationTableLabel, informationTableValue, productTitleTable, productsTitle, productIcon, productTitle, productDescription, productLink, productPriceWrapper, productPrice, productPriceLine, productPriceTotal, productPriceVerticalLine, productPriceLargeWrapper, productPriceLarge, productPriceLineBottom, footerLinksWrapper, footerCopyright } from '../../config/receipt-email-styles'

interface ReceiptEmailProps {
  email: string
  date: Date
  orderId: string
  products: Product[]
}

export const ReceiptEmail = ({
  email,
  date,
  orderId,
  products,
}: ReceiptEmailProps) => {
  const total =
    products.reduce((acc, curr) => acc + curr.price, 0) + 1

  return (
    <Html>
      <Head />
      <Preview>Your Premiumark Receipt</Preview>

      <Body style={main}>
        <Container style={container}>
          <Section>
            <Column>
              <Img
                src={`${process.env.NEXT_PUBLIC_SERVER_URL}/hippo-email-sent.png`}
                width='100'
                height='100'
                alt='Premiumark'
              />
            </Column>

            <Column align='right' style={tableCell}>
              <Text style={heading}>Receipt</Text>
            </Column>
          </Section>
          <Section style={informationTable}>
            <Row style={informationTableRow}>
              <Column style={informationTableColumn}>
                <Text style={informationTableLabel}>
                  EMAIL
                </Text>
                <Link
                  style={{
                    ...informationTableValue,
                  }}>
                  {email}
                </Link>
              </Column>

              <Column style={informationTableColumn}>
                <Text style={informationTableLabel}>
                  INVOICE DATE
                </Text>
                <Text style={informationTableValue}>
                  {format(date, 'dd MMM yyyy')}
                </Text>
              </Column>

              <Column style={informationTableColumn}>
                <Text style={informationTableLabel}>
                  ORDER ID
                </Text>
                <Link
                  style={{
                    ...informationTableValue,
                  }}>
                  {orderId}
                </Link>
              </Column>
            </Row>
          </Section>
          <Section style={productTitleTable}>
            <Text style={productsTitle}>Order Summary</Text>
          </Section>
          {products.map((product) => {
            const downloadUrl = (
              product.product_files as ProductFile
            ).url as string
            const { image } = product.images[0]

            return (
              <Section key={product.id}>
                <Column style={{ width: '64px' }}>
                  {typeof image !== 'string' &&
                  image.url ? (
                    <Img
                      src={image.url}
                      width='64'
                      height='64'
                      alt='Product Image'
                      style={productIcon}
                    />
                  ) : null}
                </Column>
                <Column style={{ paddingLeft: '22px' }}>
                  <Text style={productTitle}>
                    {product.name}
                  </Text>
                  {product.description ? (
                    <Text style={productDescription}>
                      {product.description.length > 50
                        ? product.description?.slice(
                            0,
                            50
                          ) + '...'
                        : product.description}
                    </Text>
                  ) : null}
                  <Link
                    href={downloadUrl}
                    style={productLink} download={product.name}>
                    Download Asset
                  </Link>
                </Column>

                <Column
                  style={productPriceWrapper}
                  align='right'>
                  <Text style={productPrice}>
                    {formatPrice(product.price)}
                  </Text>
                </Column>
              </Section>
            )
          })}

          <Section>
            <Column style={{ width: '64px' }}></Column>
            <Column
              style={{
                paddingLeft: '40px',
                paddingTop: 20,
              }}>
              <Text style={productTitle}>
                Transaction Fee
              </Text>
            </Column>

            <Column
              style={productPriceWrapper}
              align='right'>
              <Text style={productPrice}>
                {formatPrice(1)}
              </Text>
            </Column>
          </Section>

          <Hr style={productPriceLine} />
          <Section align='right'>
            <Column style={tableCell} align='right'>
              <Text style={productPriceTotal}>TOTAL</Text>
            </Column>
            <Column
              style={productPriceVerticalLine}></Column>
            <Column style={productPriceLargeWrapper}>
              <Text style={productPriceLarge}>
                {formatPrice(total)}
              </Text>
            </Column>
          </Section>
          <Hr style={productPriceLineBottom} />

          <Text style={footerLinksWrapper}>
            <Link href='#'>Account Settings</Link> •{' '}
            <Link href='#'>Terms of Sale</Link> •{' '}
            <Link href='#'>Privacy Policy </Link>
          </Text>
          <Text style={footerCopyright}>
            Copyright © 2023 Premiumark Inc. <br />{' '}
            <Link href='#'>All rights reserved</Link>
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

export const ReceiptEmailHtml = (
  props: ReceiptEmailProps
) =>
  render(<ReceiptEmail {...props} />, {
    pretty: true,
  })

