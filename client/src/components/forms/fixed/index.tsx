import { useNavigate } from 'react-router-dom'
import { Input, Select } from '../..'
import { ArrowLeft, Trash } from '../../../assets/svg'
import { BlueBtn, WhiteBtn } from '../../buttons';

const FixedForm = () => {
  const navigate = useNavigate();

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex flex-wrap items-center gap-3'>
        <button
          className='group mr-auto'
          onClick={() => navigate(-1)}
        >
          <ArrowLeft
            width='1.5rem'
            height='1.5rem'
            className='pointer-events-none'
            classChild='ease-in-out duration-500 fill-primary-black group-hover:fill-primary-blue'
          />
        </button>

        <WhiteBtn>
          <span
            className='text-xs pr-1'
          >
            &#10005;
          </span>
          cancel
        </WhiteBtn>

        <BlueBtn>
          <span className='pr-1'>&#43;</span>
          save
        </BlueBtn>
      </div>

      <div className="w-full border-t border-dashed border-primary-border" />

      <div className="flex flex-col w-full gap-2">
        <div className='flex flex-col md:flex-row gap-2 w-full'>
          <Select
            label='client'
            container='md:max-w-xs w-full'
            className='md:max-w-xs w-full'
            placeholder='Search Here'
            type='number'
            required
            onInput={(e) => {

            }}
          >
            <option value="sample">Sample</option>
          </Select>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 w-full">
            <Input
              container='w-full'
              className='w-full'
              name='number'
              type='number'
              placeholder='Number'
              label='number'
              required
            />

            <Input
              container='w-full'
              className='w-full'
              name='year'
              type='number'
              placeholder='Year'
              label='year'
              required
            />

            <Select
              label='status'
              container='w-full'
              className='w-full capitalize'
              placeholder='Status'
              type='text'
              required
              onSelect={(e) => {

              }}
            >
              <option className='capitalize' value="draft">draft</option>
              <option className='capitalize' value="pending">pending</option>
              <option className='capitalize' value="sent">sent</option>
              <option className='capitalize' value="accepted">accepted</option>
            </Select>
          </div>
        </div>

        <div className='flex flex-col md:flex-row gap-2 w-full'>
          <Input
            label='note'
            container='md:max-w-xs w-full'
            className='md:max-w-xs w-full'
            placeholder='Note'
            name='note'
            type='text'
          />

          <div className="grid grid-cols-2 gap-2 w-full">
            <Input
              container='w-full'
              className='w-full'
              label='date'
              placeholder='Date'
              name='date'
              type='date'
              required
            />

            <Input
              container='w-full'
              className='w-full'
              label='Expire date'
              placeholder='Expire'
              name='expire'
              type='date'
              required
            />
          </div>
        </div>
      </div>

      <div className="w-full border-t border-dashed border-primary-border" />

      <div className="flex flex-col gap-2 w-full">
        <div className="grid grid-cols-2 gap-2 w-full">
          <Input
            label='name'
            container='w-full'
            className='w-full'
            placeholder='Item Name'
            name='name'
            type='text'
          />

          <Input
            label='description'
            container='w-full'
            className='w-full'
            placeholder='Item Description'
            name='description'
            type='text'
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 w-full">
          <Input
            label='quantity'
            container='w-full'
            className='w-full'
            placeholder='Quantity'
            name='quantity'
            type='number'
          />
          <Input
            label='price'
            container='w-full'
            className='w-full'
            placeholder='Price'
            name='price'
            type='number'
          />

          <Input
            label='total'
            container='w-full'
            className='w-full'
            placeholder='Total'
            name='total'
            type='number'
            readOnly
          />
        </div>

        <button
          type='button'
          className='ml-auto w-7 h-7 p-1 rounded-full border-2 border-dotted border-primary-border aspect-square flex items-center justify-center ease-in-out duration-500 hover:border-red-500'
        >
          <Trash
            width='100%'
            height='100%'
            className='fill-primary-black pointer-events-none'
          />
        </button>
      </div>

      <button className='capitalize font-semibold text-sm text-primary-black rounded-md py-1 px-5 border border-dashed border-primary-border bg-white text-center w-full ease-in-out duration-500 hover:border-primary-blue hover:text-primary-blue'>
        <span className='pr-1'>&#43;</span>
        add field
      </button>

      <div className="w-full border-t border-dashed border-primary-border" />

      <div className="flex flex-col-reverse md:flex-row gap-4">
        <div className='mr-auto'>
          <BlueBtn
            className='px-8'
          >
            <span className='pr-1'>&#43;</span>
            save
          </BlueBtn>
        </div>

        <div className="flex flex-col gap-2">
          <div className="grid grid-cols-2 gap-2 items-center">
            <p className='text-sm font-semibold text-primary-black'>Sub Total:</p>
            <Input
              container='md:max-w-xs w-full'
              className='w-full'
              placeholder='Sub Total'
              name='subtotal'
              type='number'
              readOnly
            />
          </div>

          <div className="grid grid-cols-2 gap-2 items-center">
            <Select
              container='md:max-w-xs w-full'
              className='w-full'
              placeholder='Search Here'
              type='number'
              required
              onInput={(e) => {

              }}
            >
              <option value="sample">Sample</option>
            </Select>
            <Input
              container='md:max-w-xs w-full'
              className='w-full'
              placeholder='Tax'
              name='tax'
              type='number'
              readOnly
            />
          </div>
          <div className="grid grid-cols-2 gap-2 items-center">
            <p className='text-sm font-semibold text-primary-black'>Total:</p>
            <Input
              container='md:max-w-xs w-full'
              className='w-full'
              placeholder='Total'
              name='total'
              type='number'
              readOnly
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default FixedForm