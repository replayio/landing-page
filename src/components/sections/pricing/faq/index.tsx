import { blackA, mauve, violet } from '@radix-ui/colors'
import * as AccordionPrimitive from '@radix-ui/react-accordion'
import { ChevronDownIcon } from '@radix-ui/react-icons'
import { keyframes, styled } from '@stitches/react'
import React from 'react'

import { SectionHeading } from '~/components/common/section'

const slideDown = keyframes({
  from: { height: 0 },
  to: { height: 'var(--radix-accordion-content-height)' }
})

const slideUp = keyframes({
  from: { height: 'var(--radix-accordion-content-height)' },
  to: { height: 0 }
})

const StyledAccordion = styled(AccordionPrimitive.Root, {
  borderRadius: 6,
  backgroundColor: mauve.mauve6,
  boxShadow: `0 2px 10px ${blackA.blackA4}`
})

const StyledItem = styled(AccordionPrimitive.Item, {
  overflow: 'hidden',
  marginTop: 1,

  '&:first-child': {
    marginTop: 0,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4
  },

  '&:last-child': {
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4
  },

  '&:focus-within': {
    position: 'relative',
    zIndex: 1,
    boxShadow: `0 0 0 2px ${mauve.mauve12}`
  }
})

const StyledHeader = styled(AccordionPrimitive.Header, {
  all: 'unset',
  display: 'flex',
  fontWeight: 'bold'
})

const StyledTrigger = styled(AccordionPrimitive.Trigger, {
  all: 'unset',
  fontFamily: 'inherit',
  backgroundColor: 'transparent',
  padding: '0 20px',
  height: 45,
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  fontSize: 15,
  lineHeight: 1,
  color: mauve.mauve11,
  boxShadow: `0 1px 0 ${mauve.mauve6}`,
  '&[data-state="closed"]': { backgroundColor: 'white' },
  '&[data-state="open"]': { backgroundColor: 'white' },
  '&:hover': { backgroundColor: mauve.mauve2 }
})

const StyledContent = styled(AccordionPrimitive.Content, {
  overflow: 'hidden',
  fontSize: 15,
  color: mauve.mauve11,
  backgroundColor: mauve.mauve2,
  textAlign: 'left',

  '&[data-state="open"]': {
    animation: `${slideDown} 300ms cubic-bezier(0.87, 0, 0.13, 1)`
  },
  '&[data-state="closed"]': {
    animation: `${slideUp} 300ms cubic-bezier(0.87, 0, 0.13, 1)`
  }
})

const StyledContentText = styled('div', {
  padding: '15px 20px'
})

const StyledChevron = styled(ChevronDownIcon, {
  color: violet.violet10,
  transition: 'transform 300ms cubic-bezier(0.87, 0, 0.13, 1)',
  '[data-state=open] &': { transform: 'rotate(180deg)' }
})

// Exports
export const Accordion = StyledAccordion
export const AccordionItem = StyledItem
export const AccordionTrigger = React.forwardRef(
  ({ children, ...props }, forwardedRef) => (
    <StyledHeader>
      <StyledTrigger {...props} ref={forwardedRef}>
        {children}
        <StyledChevron aria-hidden />
      </StyledTrigger>
    </StyledHeader>
  )
)
export const AccordionContent = React.forwardRef(
  ({ children, ...props }, forwardedRef) => (
    <StyledContent {...props} ref={forwardedRef}>
      <StyledContentText>{children}</StyledContentText>
    </StyledContent>
  )
)

// Your app...
export const AccordionDemo = () => (
  <div style={{ marginTop: '100px' }}>
    <SectionHeading
      title="Frequently Asked Questions"
      subtitle={
        <div>
          <Accordion type="single" defaultValue="item-1" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>
                Do I need a credit card to sign up?
              </AccordionTrigger>
              <AccordionContent>
                Yes. It adheres to the WAI-ARIA design pattern.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger>Is Replay secure?</AccordionTrigger>
              <AccordionContent>
                <p>
                  We put the security and privacy of our users first. Replay
                  supports several wellknown compliance frameworks including
                  GDPR, CCPA, and SOC2 Type 2. For more information, see our{' '}
                  <a
                    style={{ textDecoration: 'underline' }}
                    href="https://www.replay.io/security-privacy"
                  >
                    policies
                  </a>{' '}
                  here and if you have any questions, let us know.
                </p>{' '}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-data">
              <AccordionTrigger>Where's my data stored?</AccordionTrigger>
              <AccordionContent>
                <p>
                  We put the security and privacy of our users first. Replay
                  supports several wellknown compliance frameworks including
                  GDPR, CCPA, and SOC2 Type 2. For more information, see our{' '}
                  <a
                    style={{ textDecoration: 'underline' }}
                    href="https://www.replay.io/security-privacy"
                  >
                    policies
                  </a>{' '}
                  here and if you have any questions, let us know.
                </p>{' '}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger>
                Do I need a credit card to sign up?
              </AccordionTrigger>
              <AccordionContent>
                Absolutely not! We never ask for your credit card on sign up. If
                you start on a paid plan then 30 days after signing up you will
                be politely prompted to enter in your payment information.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger>Can I cancel at anytime?</AccordionTrigger>
              <AccordionContent>
                Definitely! You can cancel or downgrade your subscription at
                anytime. You can also delete your workplace in the settings page
                at anytime.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      }
      centered
    />
  </div>
)

export default AccordionDemo
