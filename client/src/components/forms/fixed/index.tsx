import { Input, Select } from '../..'
import { Trash } from '../../../assets/svg'

const FixedForm = () => {
  return (
    <div className='flex flex-col gap-4'>
      <div className='flex flex-wrap items-center gap-3'>
        <button
          className='mr-auto capitalize text-[50px] text-primary-black text-left ease-in-out duration-500 hover:text-primary-blue'
        >
          &#x2190;
        </button>

        <button
          className='bg-white border border-primary-border rounded-md px-3 py-1 text-sm capitalize text-primary-black ease-in-out duration-500 hover:bg-primary-border'
        >
          <span
            className='text-xs pr-1'
          >
            &#10005;
          </span>
          cancel
        </button>

        <button
          className='font-semibold border border-primary-blue bg-primary-blue rounded-md text-white px-3 py-1 text-sm capitalize ease-in-out duration-500 hover:bg-secondary-blue hover:border-secondary-blue'
        >
          <span className='pr-1'>&#43;</span>
          save
        </button>
      </div>

      <div className="w-full border-t border-dashed border-primary-border" />

      <div className="flex flex-col w-full gap-2">
        <div className='flex flex-col md:flex-row gap-2 w-full'>
          <div className='flex flex-col md:max-w-xs w-full'>
            <Select
              label='client'
              className='md:max-w-xs w-full'
              placeholder='Search Here'
              type='number'
              required
              onInput={(e) => {

              }}
            >
              <option value="sample">Sample</option>
            </Select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 w-full">
            <div className='flex flex-col w-full'>
              <Input
                className='w-full'
                name='number'
                type='number'
                placeholder='Number'
                label='number'
                required
              />
            </div>

            <div className='flex flex-col w-full'>
              <Input
                className='w-full'
                name='year'
                type='number'
                placeholder='Year'
                label='year'
                required
              />
            </div>

            <div className='flex flex-col w-full'>
              <Select
                label='status'
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
        </div>

        <div className='flex flex-col md:flex-row gap-2 w-full'>
          <div className='flex flex-col md:max-w-xs w-full'>
            <Input
              label='note'
              className='md:max-w-xs w-full'
              placeholder='Note'
              name='note'
              type='text'
            />
          </div>

          <div className="grid grid-cols-2 gap-2 w-full">
            <div className='flex flex-col w-full'>
              <Input
                className='w-full'
                label='date'
                placeholder='Date'
                name='date'
                type='date'
                required
              />
            </div>

            <div className='flex flex-col w-full'>
              <Input
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
      </div>

      <div className="w-full border-t border-dashed border-primary-border" />

      <div className="flex flex-col gap-2 w-full">
        <div className="grid grid-cols-2 gap-2 w-full">
          <div className='w-full'>
            <Input
              label='name'
              className='w-full'
              placeholder='Item Name'
              name='name'
              type='text'
            />
          </div>
          <div className='w-full'>
            <Input
              label='description'
              className='w-full'
              placeholder='Item Description'
              name='description'
              type='text'
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 w-full">
          <div className='w-full'>
            <Input
              label='quantity'
              className='w-full'
              placeholder='Quantity'
              name='quantity'
              type='number'
            />
          </div>
          <div className='w-full'>
            <Input
              label='price'
              className='w-full'
              placeholder='Price'
              name='price'
              type='number'
            />
          </div>

          <div className='w-full'>
            <Input
              label='total'
              className='w-full'
              placeholder='Total'
              name='total'
              type='number'
              readOnly
            />
          </div>
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
          <button
            className='font-semibold border border-primary-blue bg-primary-blue rounded-md text-white px-7 py-1 text-sm capitalize ease-in-out duration-500 hover:bg-secondary-blue hover:border-secondary-blue'
          >
            <span className='pr-1'>&#43;</span>
            save
          </button>
        </div>

        <div className="flex flex-col gap-2">
          <div className="grid grid-cols-2 gap-2 items-center">
            <p className='text-sm font-semibold text-primary-black'>Sub Total:</p>
            <Input
              className='md:max-w-xs w-full'
              placeholder='Sub Total'
              name='subtotal'
              type='number'
              readOnly
            />
          </div>

          <div className="grid grid-cols-2 gap-2 items-center">
            <Select
              className='md:max-w-xs w-full'
              placeholder='Search Here'
              type='number'
              required
              onInput={(e) => {

              }}
            >
              <option value="sample">Sample</option>
            </Select>
            <Input
              className='md:max-w-xs w-full'
              placeholder='Tax'
              name='tax'
              type='number'
              readOnly
            />
          </div>
          <div className="grid grid-cols-2 gap-2 items-center">
            <p className='text-sm font-semibold text-primary-black'>Total:</p>
            <Input
              className='md:max-w-xs w-full'
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