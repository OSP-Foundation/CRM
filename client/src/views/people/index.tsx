import { ChangeEvent, FormEvent, Fragment, useEffect, useRef, useState } from 'react'
import { Drawer, Input, PrimaryLayout, Select, drawerRef } from '../../components'
import { Table, Td, TdMenu } from '../../components/table'
import { SimpleForm } from '../../components/forms'
import { BlueBtn } from '../../components/buttons'
import { axios } from '../../lib'

const People = () => {
  const limit: number = 20;

  // for modal
  const ref = useRef<drawerRef>(null)

  // for abort controller
  const abort = useRef<{
    getAll?: AbortController,
    company?: AbortController,
    delete?: AbortController
  }>({})

  const [company, setCompany] = useState<{
    selected?: string,
    items?: {}[]
  }>({})

  // for new person form
  const [form, setForm] = useState<{
    _id?: string,
    name: string,
    country?: string,
    phone?: string,
    email?: string,
    company?: string
  }>({ name: "" })

  // for form submit conditions
  const [conditions, setConditions] = useState<{
    submiting?: boolean,
    error?: string
  }>({})

  // for search
  const [search, setSearch] = useState<string | null>(null)

  const [state, setState] = useState<{
    pages?: number[],
    total?: number,
    items?: {}[],
    activePage?: number
  }>({})

  const openDrawer = (v?: any) => {
    if (v) {
      setForm({ ...v, company: v?.company?._id ? v?.company?._id : undefined })

      setCompany({ selected: v?.company?.name ? v?.company?.name : undefined })
    } else {
      setForm({ name: '' })

      setCompany({})
    }

    setConditions({})

    ref?.current?.open?.()
  }

  const deleteItem = async (_id: string) => {
    if (_id && window.confirm("Do you want delete?")) {
      if (abort?.current?.delete) {
        abort?.current?.delete?.abort()
      }

      abort.current.delete = new AbortController()

      try {
        await axios.delete("/customers/people", {
          data: {
            _id
          },
          signal: abort?.current?.delete?.signal
        })

        getItems?.()

        alert("Success")
      } catch (err: any) {
        if (err?.code !== "ERR_CANCELED") {
          alert(err?.response?.data?.message)
        }
      }
    }
  }

  const getItems = async (page = 1) => {
    if (abort?.current?.getAll) {
      abort?.current?.getAll?.abort()
    }

    abort.current.getAll = new AbortController()

    try {
      const res = await axios.get('/customers/people/', {
        signal: abort?.current?.getAll?.signal,
        params: {
          total: true,
          limit,
          search,
          skip: page > 1 ? limit * (page - 1) : 0,
        }
      })

      const pages: number[] = []

      for (let i = page - Math.floor(4 / 2); i <= page + Math.floor(4 / 2); i++) {
        if (i > 0 && i <= Math.ceil(res?.['data']?.data?.total / limit)) {
          pages.push(i);
        }
      }

      setState({
        ...res?.['data']?.data,
        pages,
        activePage: page
      })
    } catch (err: any) {
      if (err?.code !== "ERR_CANCELED") {
        alert(err?.response?.data?.message)
      }
    }
  }

  const getCompanies = async (e: ChangeEvent<HTMLInputElement>) => {
    setCompany((state) => ({ ...state, selected: e?.target?.value, items: [] }));

    setForm((state) => ({ ...state, company: undefined }))

    if (abort?.current?.company) {
      abort?.current?.company?.abort()
    }

    abort.current.company = new AbortController()

    try {
      const res = await axios.get('/customers/company/', {
        signal: abort?.current?.company?.signal,
        params: {
          limit: 20,
          search: e?.target?.value
        }
      })

      setCompany((state) => ({ ...state, items: res?.['data']?.data?.items }))

    } catch (err: any) {
      if (err?.code !== "ERR_CANCELED") {
        alert(err?.response?.data?.message)
      }
    }
  }

  // to listen input events
  const InputHandle = (e: ChangeEvent<HTMLInputElement>) => {
    if (!conditions?.submiting) {
      setForm((state) => ({
        ...state,
        [e?.target?.name]: e?.target?.value
      }))
    }
  }

  const FormHandle = async (e: FormEvent) => {
    e?.preventDefault?.()

    if (!conditions?.submiting) {
      setConditions({ submiting: true })

      try {
        if (form?._id) {
          await axios.put('/customers/people/', form)
        } else {
          await axios.post('/customers/people/', form)
        }

        alert("Success")

        setForm({ name: '' })

        getItems?.()

        ref?.current?.close?.()
      } catch (err: any) {
        setConditions((state) => ({ ...state, error: err?.response?.data?.message || "Something Went Wrong" }))
      } finally {
        setConditions((state) => ({ ...state, submiting: false }))
      }
    }
  }

  useEffect(() => {
    getItems?.()
  }, [search])

  return (
    <Fragment>
      <Drawer
        ref={ref}
      >
        <SimpleForm
          onSubmit={FormHandle}
          {...conditions}
        >
          <Input
            container='w-full'
            className='w-full'
            label='name'
            placeholder='Enter Name'
            name='name'
            type='text'
            required
            value={form?.name}
            onChange={InputHandle}
          />

          <Input
            container='w-full'
            className='w-full'
            label='country'
            placeholder='Enter Country'
            name='country'
            type='text'
            value={form?.country}
            onChange={InputHandle}
          />

          <Input
            container='w-full'
            className='w-full'
            label='phone'
            placeholder='+1 646 221 3032'
            name='phone'
            type='text'
            value={form?.phone}
            onChange={InputHandle}
          />

          <Input
            container='w-full'
            className='w-full'
            label='email'
            placeholder='Enter Email'
            name='email'
            type='email'
            value={form?.email}
            onChange={InputHandle}
          />

          <Select
            container='w-full'
            className='w-full'
            label='Company'
            placeholder='Search Here'
            type='text'
            value={company?.selected}
            onInput={getCompanies}
            onSelect={(v) => {
              setCompany((state) => ({ ...state, selected: v?.target?.text }))

              setForm((state) => ({ ...state, company: v?.target?.value }))
            }}
          >
            {
              company?.items?.map((v: any, k: number) => {
                return <option key={k} value={v?._id}>{v?.name}</option>
              })
            }
          </Select>
        </SimpleForm>
      </Drawer>

      <PrimaryLayout
        Actions={<BlueBtn
          type='button'
          onClick={() => openDrawer?.()}
        >
          add new person
        </BlueBtn>}

        search={{
          onChange: (e) => setSearch(e?.target?.value),
          value: search
        }}

        refresh={getItems}
      >
        <Table
          titles={['name', 'company', 'country', 'phone', 'email', '']}
        >
          {
            state?.items?.map((v: any, k: number) => {
              return <tr key={k}>
                <Td>{v?.name}</Td>
                <Td>{v?.company?.name}</Td>
                <Td>
                  {
                    v?.country && <button className='border border-primary-bg bg-primary-bg capitalize text-xs text-primary-black rounded-md py-1 px-3 pointer-events-none'>
                      {v?.country}
                    </button>
                  }
                </Td>
                <Td>{v?.phone}</Td>
                <Td>{v?.email}</Td>
                <TdMenu>
                  <button>
                    show
                  </button>
                  <button onClick={() => openDrawer?.(v)}>
                    edit
                  </button>
                  <button onClick={() => deleteItem?.(v?._id)}>
                    delete
                  </button>
                </TdMenu>
              </tr>
            })
          }
        </Table>

        <div className='ml-auto flex flex-row gap-2 items-center'>
          {
            state?.pages?.map((v: number, k: number) => {
              return <button
                key={k}
                onClick={() => { if (v !== state?.activePage) getItems(v) }}
                className={`px-3 p-1 text-sm border bg-white rounded-md font-medium ${state?.activePage == v ? 'text-primary-blue border-primary-blue' : 'text-primary-black ease-in-out duration-500 border border-white hover:bg-primary-border hover:border-primary-border'}`}
              >
                {v}
              </button>
            })
          }
        </div>
      </PrimaryLayout>
    </Fragment >
  )
}

export default People